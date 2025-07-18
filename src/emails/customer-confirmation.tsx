
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import { format } from 'date-fns';
import type { BookingFormValues } from '@/app/[locale]/booking/actions';

interface CustomerConfirmationEmailProps {
  name: string;
  data: BookingFormValues;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ? `https://${process.env.NEXT_PUBLIC_SITE_URL}` : '';

export default function CustomerConfirmationEmail({ name, data }: CustomerConfirmationEmailProps) {
  const previewText = `Your booking request with Touchup is confirmed.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src="https://firebasestorage.googleapis.com/v0/b/touchup-42i8o.firebasestorage.app/o/logo%2Flogo%20black%20en.png?alt=media&token=74ca5c3b-ee14-4188-a000-8f3b4f91bca4"
                width="120"
                height="35"
                alt="Touchup Logo"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Thanks for your booking, {name}!
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hi {name}, we've received your booking request and our team will contact you shortly to confirm the final details of your appointment.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Here's a summary of your request:
            </Text>

            <Section className="bg-gray-100/50 p-4 rounded-md">
               <Heading as="h2" className="text-black text-[20px] font-normal mt-0">Booking Summary</Heading>
               <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Service:</strong> {data.service}</Text>
               <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Property Type:</strong> {data.propertyType}</Text>
               <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Property Details:</strong> {data.specificPropertyType}</Text>
               <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Preferred Date:</strong> {format(data.date, 'PPP')}</Text>
               <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Preferred Time:</strong> {data.time}</Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            
            <Section>
                <Text className="text-black text-[14px] leading-[24px]">
                    If you have any questions or need to make changes, please don't hesitate to contact us at <Link href="mailto:info@touchup.ae" className="text-blue-600 no-underline">info@touchup.ae</Link> or by phone at <span className="tracking-wider" dir="ltr">+971542477677</span>.
                </Text>
                <Text className="text-black text-[14px] leading-[24px]">
                    We look forward to serving you!
                </Text>
                <Text className="text-black text-[14px] leading-[24px]">
                    — The Touchup Building Maintenance Team
                </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
