
"use client";

import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
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
  address: z.string().min(10, { message: 'Address must be at least 10 characters.' }),
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
            
            <div className="grid md:grid-cols-2 gap-8">
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
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Villa 123, Street 45, Your Area, Dubai" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
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
    </Card>
  );
}
