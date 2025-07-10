'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, Loader2 } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { submitContactForm } from './actions';

const contactDetails = [
  { icon: Phone, text: '+971 54 531 4170', href: 'tel:+971545314170' },
  { icon: Mail, text: 'info@touchup.ae', href: 'mailto:info@touchup.ae' },
  { icon: MapPin, text: 'A202 - Sport Society Mall - Mirdif - Dubai', href: 'https://maps.app.goo.gl/j2K9xckTiutBcczi7' },
];

export default function ContactPage() {
  const t = useTranslations('ContactPage');
  const tBooking = useTranslations('BookingPage.form');
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const formSchema = z.object({
    name: z.string().min(2, { message: t('formValidation.nameRequired') }),
    email: z.string().email({ message: t('formValidation.emailInvalid') }),
    subject: z.string().min(3, { message: t('formValidation.subjectRequired') }),
    message: z.string().min(10, { message: t('formValidation.messageRequired') }),
    terms: z.boolean().refine((val) => val === true, {
      message: 'You must accept the terms and conditions.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      terms: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await submitContactForm(values);
      if (result.success) {
        toast({
          title: t('formStatus.successTitle'),
          description: t('formStatus.successDescription'),
        });
        form.reset();
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('formStatus.errorTitle'),
        description: t('formStatus.errorDescription'),
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{t('title')}</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-center">{t('formTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col p-6 pt-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex flex-col flex-grow">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={t('namePlaceholder')} {...field} />
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
                      <FormControl>
                        <Input type="email" placeholder={t('emailPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={t('subjectPlaceholder')} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-grow flex flex-col">
                      <FormControl>
                        <Textarea placeholder={t('messagePlaceholder')} className="flex-grow" {...field} />
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
                          {tBooking('terms')}{' '}
                          <Link href="/terms-and-conditions" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                            {tBooking('termsLink')}
                          </Link>
                          .
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isSubmitting ? t('sendingButton') : t('sendButton')}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Contact Details */}
        <Card className="flex flex-col">
          <CardHeader className="text-center">
            <CardTitle className="font-headline text-2xl">{t('infoTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col items-center justify-around p-6 text-lg">
            {contactDetails.map((item, index) => (
              <a key={index} href={item.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors text-start w-full">
                <item.icon className="h-8 w-8 text-primary shrink-0" />
                <span>{item.text}</span>
              </a>
            ))}
            <div className="flex flex-col items-center gap-3 text-muted-foreground">
              <Clock className="h-8 w-8 text-primary" />
              <ul className="text-center">
                <li><strong>{t('workHours.mon_fri')}</strong> {t('workHoursTime.mon_fri')}</li>
                <li><strong>{t('workHours.sat')}</strong> {t('workHoursTime.sat')}</li>
                <li><strong>{t('workHours.sun')}</strong> {t('workHoursTime.sun')}</li>
              </ul>
            </div>
            <Button asChild size="lg" className="w-full max-w-xs bg-green-500 hover:bg-green-600">
              <a href="https://wa.me/+971545314170" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-6 w-6"
                  fill="currentColor"
                >
                  <path
                    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.8 0-65.7-11.8-90.3-32.5l-6.7-4-67.1 17.5L52.4 352l-4.4-7c-18.6-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"
                  ></path>
                </svg>
                {t('chatOnWhatsApp')}
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      {/* Map */}
      <div className="mt-12 rounded-lg overflow-hidden shadow-md">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1804.720140556507!2d55.4071128318501!3d25.222091595902192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f610690b32a1b%3A0xe12a1ef297e8c056!2sSport%20Society!5e0!3m2!1sen!2sae!4v1752040962765!5m2!1sen!2sae" 
          width="100%" 
          height="450" 
          style={{border:0}} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade">
        </iframe>
      </div>
    </div>
  );
}
