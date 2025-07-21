import {
  Body,
  Button,
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
import type { BookingEmailData } from '@/app/[locale]/booking/actions';

interface CustomerConfirmationEmailProps {
  name: string;
  data: BookingEmailData;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://touchup.ae';

export default function CustomerConfirmationEmail({ name, data }: CustomerConfirmationEmailProps) {
  const previewText = `Your booking request with Touchup is confirmed.`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 my-auto mx-auto font-sans">
          <Container className="border border-solid border-gray-200 rounded my-10 mx-auto p-8 w-full max-w-2xl bg-white shadow-sm">
            <Section className="mt-8">
              <Img
                src={`${baseUrl}/Images/logo black en.webp`}
                width="150"
                height="auto"
                alt="Touchup.ae Logo"
                className="my-0 mx-auto"
              />
            </Section>
            
            <Heading className="text-black text-2xl font-bold text-center p-0 my-8 mx-0">
              Thanks for your booking, {name}!
            </Heading>

            <Text className="text-black text-base leading-6">
              Hi {name}, we've received your booking request and our team will contact you shortly to confirm the final details of your appointment.
            </Text>
            
            <Text className="text-black text-base leading-6">
              Here is a summary of your request:
            </Text>

            <Section className="border border-solid border-gray-200 rounded-md p-6 my-8">
               <Heading as="h2" className="text-black text-xl font-semibold m-0">Booking Summary</Heading>
               <Hr className="border border-solid border-gray-200 my-4 mx-0 w-full" />
               <Text className="text-black text-base leading-6 m-0"><strong>Service:</strong> {data.service}</Text>
               <Text className="text-black text-base leading-6 m-0"><strong>Property Type:</strong> {data.propertyType}</Text>
               <Text className="text-black text-base leading-6 m-0"><strong>Property Details:</strong> {data.specificPropertyType}</Text>
               <Text className="text-black text-base leading-6 m-0"><strong>Preferred Date:</strong> {data.date}</Text>
               <Text className="text-black text-base leading-6 m-0"><strong>Preferred Time:</strong> {data.time}</Text>
            </Section>
            
            <Section className="text-center mt-8 mb-8">
                <Button href={`${baseUrl}/contact`} className="bg-primary text-primary-foreground rounded-md py-3 px-5 text-sm font-semibold no-underline text-center">
                    Contact Us
                </Button>
            </Section>

            <Text className="text-black text-base leading-6">
                If you have any questions or need to make changes, please don't hesitate to reply to this email or contact us at <Link href="mailto:info@touchup.ae" className="text-blue-600 underline">info@touchup.ae</Link>.
            </Text>

            <Text className="text-black text-base leading-6">
                We look forward to serving you!
                <br />
                — The Touchup Building Maintenance Team
            </Text>

            <Hr className="border border-solid border-gray-200 my-8 mx-0 w-full" />
            
            <Text className="text-center text-gray-500 text-xs">
              © {new Date().getFullYear()} Touchup.ae. All Rights Reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}