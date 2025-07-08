
"use client";

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, MapPin, Loader2 } from 'lucide-react';
import * as React from 'react';

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

const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(9, { message: 'Please enter a valid phone number.' }),
  service: z.string({ required_error: 'Please select a service.' }),
  propertyType: z.enum(['residential', 'commercial'], {
    required_error: 'You need to select a property type.',
  }),
  specificPropertyType: z.string({ required_error: 'Please select the property details.' }),
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string({ required_error: 'Please select a time slot.' }),
  apartmentVilla: z.string().min(1, { message: 'Please enter your apartment/villa number.' }),
  building: z.string().min(2, { message: 'Please enter your building/villa name.' }),
  street: z.string().min(3, { message: 'Please enter a valid street.' }),
  area: z.string().min(3, { message: 'Please enter a valid area.' }),
  city: z.string().min(2, { message: 'Please enter a valid city.' }),
  instructions: z.string().optional(),
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
  const defaultService = searchParams.get('service') || '';
  const { toast } = useToast();
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
      address: '',
      instructions: '',
      specificPropertyType: '',
      time: '',
      apartmentVilla: '',
      building: '',
      street: '',
      area: '',
      city: 'Dubai',
    },
  });

  const propertyType = form.watch('propertyType');

  React.useEffect(() => {
    if (propertyType) {
      form.resetField('specificPropertyType', { defaultValue: '' });
    }
  }, [propertyType, form]);


  function onSubmit(data: BookingFormValues) {
    console.log(data);
    toast({
      title: 'Booking Request Sent!',
      description: 'Thank you! We have received your request and will contact you shortly to confirm.',
    });
    form.reset();
  }

  const handleDetectLocation = async () => {
    setIsDetectingLocation(true);
    if (!navigator.geolocation) {
      toast({
        variant: 'destructive',
        title: 'Geolocation not supported',
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
            title: 'Error detecting location',
            description: 'Could not fetch address details. Please enter manually.',
          });
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        let errorMessage = 'An unknown error occurred.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'You denied the request for Geolocation.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage = 'The request to get user location timed out.';
            break;
        }
        toast({
          variant: 'destructive',
          title: 'Geolocation Error',
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
      title: 'Address Cleared',
      description: 'Please enter your address manually.',
    });
  }

  const handleConfirmAction = () => {
    toast({
        title: 'Address Confirmed',
        description: 'Please double-check and fill in any missing details like your apartment number.',
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
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
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
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
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
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+971 50 123 4567" {...field} />
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
                    <FormLabel>Service Required</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.slug} value={service.slug}>
                            {service.title}
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
                  <FormLabel>Property Type</FormLabel>
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
                          Residential
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="commercial" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Commercial
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
                    <FormLabel>{propertyType === 'residential' ? 'Property Details' : 'Business Type'}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select a ${propertyType === 'residential' ? 'property type' : 'business type'}`} />
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
                    <FormLabel>Preferred Date</FormLabel>
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
                              <span>Pick a date</span>
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
                    <FormLabel>Preferred Time</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
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
                    <FormLabel>Full Address</FormLabel>
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
                      Detect
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="apartmentVilla"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-xs text-muted-foreground">Apt / Villa No.</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. 1204 or Villa 5" {...field} />
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
                                <FormLabel className="text-xs text-muted-foreground">Building / Villa Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Marina Tower" {...field} />
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
                                 <FormLabel className="text-xs text-muted-foreground">Street</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Al Safa St" {...field} />
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
                                <FormLabel className="text-xs text-muted-foreground">Area / Community</FormLabel>
                                <FormControl>
                                    <Input placeholder="e.g. Dubai Marina" {...field} />
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
                                <FormLabel className="text-xs text-muted-foreground">City</FormLabel>
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
                  <FormLabel>Special Instructions (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Please call before arrival." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit" size="lg" className="w-full">Submit Booking Request</Button>
          </form>
        </Form>
      </CardContent>
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Detected Address</AlertDialogTitle>
            <AlertDialogDescription>
              Is the following address approximately correct? Please fill in your specific apartment or villa number manually.
              <p className="font-semibold text-foreground mt-2">{detectedAddressString}</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleConfirmCancel}>
              No, Enter Manually
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmAction}>
              Yes, Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}
