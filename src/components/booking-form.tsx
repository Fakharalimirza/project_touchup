
"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Loader2 } from 'lucide-react';
import * as React from 'react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { services } from '@/lib/data';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { submitBooking } from '@/app/booking/actions';


const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(9, { message: 'Please enter a valid phone number.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  propertyType: z.enum(['residential', 'commercial'], {
    required_error: 'You need to select a property type.',
  }),
  specificPropertyType: z.string().min(1, { message: 'Please select the property details.' }),
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string().min(1, { message: 'Please select a time slot.' }),
  apartmentVilla: z.string().min(1, { message: 'Please enter your apartment/villa number.' }),
  building: z.string().min(2, { message: 'Please enter your building/villa name.' }),
  street: z.string().min(3, { message: 'Please enter a valid street.' }),
  area: z.string().min(3, { message: 'Please enter a valid area.' }),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  instructions: z.string().optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions.',
  }),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

const residentialOptions = [
  { value: 'studio', label: 'Studio' },
  { value: '1bhk', label: '1BHK' },
  { value: '2bhk', label: '2BHK' },
  { value: '3bhk', label: '3BHK' },
  { value: 'villa', label: 'Villa' },
];

const commercialOptions = [
  { value: 'shop', label: 'Shop' },
  { value: 'office', label: 'Office' },
];

const timeSlots = [
  '09:00 AM - 11:00 AM',
  '11:00 AM - 01:00 PM',
  '01:00 PM - 03:00 PM',
  '03:00 PM - 05:00 PM',
  '05:00 PM - 07:00 PM',
];


export default function BookingForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultService = searchParams.get('service') || '';
  const { toast } = useToast();
  const tServices = useTranslations('Services');
  const t = useTranslations('BookingPage.form');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isCalendarOpen, setCalendarOpen] = React.useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = React.useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [detectedAddressString, setDetectedAddressString] = React.useState('');

  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      service: defaultService,
      instructions: '',
      specificPropertyType: '',
      time: '',
      apartmentVilla: '',
      building: '',
      street: '',
      area: '',
      city: 'Dubai',
      terms: false,
    },
  });

  const propertyType = form.watch('propertyType');

  React.useEffect(() => {
    if (propertyType) {
      form.resetField('specificPropertyType', { defaultValue: '' });
    }
  }, [propertyType, form]);


  async function onSubmit(data: BookingFormValues) {
    setIsSubmitting(true);
    try {
      const result = await submitBooking(data);
      if (result.success) {
        toast({
          title: t('successTitle'),
          description: t('successDescription'),
        });
        form.reset();
        setTimeout(() => {
          router.push('/');
        }, 5000);
      } else {
        toast({
          variant: 'destructive',
          title: t('failTitle'),
          description: result.error || t('failDescription'),
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast({
        variant: 'destructive',
        title: t('errorTitle'),
        description: t('errorDescription'),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    if (!navigator.geolocation) {
      toast({
        variant: 'destructive',
        title: t('geoErrorTitle'),
        description: 'Your browser does not support geolocation.',
      });
      setIsDetectingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Using OpenStreetMap's free Nominatim reverse geocoding service
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
          );
          if (!response.ok) throw new Error('Failed to fetch address');
          const data = await response.json();
          if (data && data.display_name && data.address) {
            form.setValue('street', data.address.road || '', { shouldValidate: true });
            form.setValue('area', data.address.suburb || data.address.neighbourhood || '', { shouldValidate: true });
            form.setValue('city', data.address.city || 'Dubai', { shouldValidate: true });
            form.setValue('building', data.address.building || data.address.house_number || '', { shouldValidate: true });
            setDetectedAddressString(data.display_name);
            setShowConfirmDialog(true);
          } else {
            throw new Error('Could not find address');
          }
        } catch (error) {
          toast({
            variant: 'destructive',
            title: t('geoDetectErrorTitle'),
            description: t('geoDetectErrorDescription'),
          });
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        let errorMessage = t('geoErrorUnknown');
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = t('geoErrorDenied');
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = t('geoErrorUnavailable');
            break;
          case error.TIMEOUT:
            errorMessage = t('geoErrorTimeout');
            break;
        }
        toast({
          variant: 'destructive',
          title: t('geoErrorTitle'),
          description: errorMessage,
        });
        setIsDetectingLocation(false);
      }
    );
  };

  const handleConfirmCancel = () => {
    form.setValue('street', '', { shouldValidate: false });
    form.setValue('area', '', { shouldValidate: false });
    form.setValue('city', 'Dubai', { shouldValidate: false });
    form.setValue('building', '', { shouldValidate: false });
    form.setValue('apartmentVilla', '', { shouldValidate: false });
    toast({
      title: t('addressClearedTitle'),
      description: t('addressClearedDescription'),
    });
  }

  const handleConfirmAction = () => {
    toast({
        title: t('addressConfirmedTitle'),
        description: t('addressConfirmedDescription'),
    });
  }

  return (
    <Card>
      <CardContent className="p-6 md:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('fullName')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('fullNamePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('email')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('emailPlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('phone')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('phonePlaceholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('service')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('servicePlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.slug} value={service.slug}>
                            {tServices(`${service.slug}.title`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>{t('propertyType')}</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center space-x-6"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="residential" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t('residential')}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="commercial" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {t('commercial')}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {propertyType && (
              <FormField
                control={form.control}
                name="specificPropertyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{propertyType === 'residential' ? t('propertyDetails') : t('businessType')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={propertyType === 'residential' ? t('propertyDetailsPlaceholder') : t('businessTypePlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(propertyType === 'residential' ? residentialOptions : commercialOptions).map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('preferredDate')}</FormLabel>
                    <Popover open={isCalendarOpen} onOpenChange={setCalendarOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>{t('pickDate')}</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={(date) => {
                            field.onChange(date);
                            setCalendarOpen(false);
                          }}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('preferredTime')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('timePlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map(slot => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <FormLabel>{t('fullAddress')}</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleDetectLocation}
                      disabled={isDetectingLocation}
                    >
                      {isDetectingLocation ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <MapPin className="mr-2 h-4 w-4" />
                      )}
                      {isDetectingLocation ? t('detectingButton') : t('detectButton')}
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="apartmentVilla"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs text-muted-foreground">{t('aptNo')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('aptNoPlaceholder')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="building"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs text-muted-foreground">{t('buildingName')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('buildingNamePlaceholder')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="street"
                        render={({ field }) => (
                            <FormItem>
                                 <FormLabel className="text-xs text-muted-foreground">{t('street')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('streetPlaceholder')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="area"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs text-muted-foreground">{t('area')}</FormLabel>
                                <FormControl>
                                    <Input placeholder={t('areaPlaceholder')} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                     <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs text-muted-foreground">{t('city')}</FormLabel>

                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </div>
            
            <FormField
              control={form.control}
              name="instructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('specialInstructions')}</FormLabel>
                  <FormControl>
                    <Textarea placeholder={t('specialInstructionsPlaceholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      {t('terms')}{' '}
                      <Link href="/terms-and-conditions" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                        {t('termsLink')}
                      </Link>
                      .
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? t('submittingButton') : t('submitButton')}
            </Button>
          </form>
        </Form>
      </CardContent>
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('addressConfirmTitle')}</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div>
                {t('addressConfirmDescription')}
                <div className="font-semibold text-foreground mt-2">{detectedAddressString}</div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleConfirmCancel}>
              {t('addressConfirmCancel')}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>
              {t('addressConfirmAction')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
