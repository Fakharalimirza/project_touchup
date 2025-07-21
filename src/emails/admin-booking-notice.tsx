import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
} from '@react-email/components';
import type { BookingEmailData } from '@/app/[locale]/booking/actions';

interface AdminBookingNoticeEmailProps {
  data: BookingEmailData;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://touchup.ae';

export default function AdminBookingNoticeEmail({ data }: AdminBookingNoticeEmailProps) {
  const previewText = `New Booking Request from ${data.name}`;

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
              New Booking Request
            </Heading>

            <Text className="text-black text-base leading-6">
              A new booking request has been submitted. Please review the details below and follow up with the customer promptly.
            </Text>

            <Section className="border border-solid border-gray-200 rounded-md p-6 my-8">
              <Heading as="h2" className="text-black text-xl font-semibold m-0">Customer Details</Heading>
              <Hr className="border border-solid border-gray-200 my-4 mx-0 w-full" />
              <Text className="text-black text-base leading-6 m-0"><strong>Name:</strong> {data.name}</Text>
              <Text className="text-black text-base leading-6 m-0"><strong>Email:</strong> {data.email}</Text>
              <Text className="text-black text-base leading-6 m-0"><strong>Phone:</strong> {data.phone}</Text>
            </Section>

            <Section className="border border-solid border-gray-200 rounded-md p-6 my-8">
               <Heading as="h2" className="text-black text-xl font-semibold m-0">Booking Details</Heading>
               <Hr className="border border-solid border-gray-200 my-4 mx-0 w-full" />
               <Text className="text-black text-base leading-6 m-0"><strong>Service:</strong> {data.service}</Text>
               <Text className="text-black text-base leading-6 m-0"><strong>Property Type:</strong> {data.propertyType}</Text>
               <Text className="text-black text-base leading-6 m-0"><strong>Property Details:</strong> {data.specificPropertyType}</Text>
               <Text className="text-black text-base leading-6 m-0"><strong>Preferred Date:</strong> {data.date}</Text>
               <Text className="text-black text-base leading-6 m-0"><strong>Preferred Time:</strong> {data.time}</Text>
            </Section>

             <Section className="border border-solid border-gray-200 rounded-md p-6 my-8">
                <Heading as="h2" className="text-black text-xl font-semibold m-0">Address</Heading>
                <Hr className="border border-solid border-gray-200 my-4 mx-0 w-full" />
                <Text className="text-black text-base leading-6 m-0">
                  {data.apartmentVilla}, {data.building}<br />
                  {data.street}, {data.area}<br />
                  {data.city}
                </Text>
             </Section>

            {data.instructions && (
              <Section className="border border-solid border-gray-200 rounded-md p-6 my-8">
                <Heading as="h2" className="text-black text-xl font-semibold m-0">Special Instructions</Heading>
                 <Hr className="border border-solid border-gray-200 my-4 mx-0 w-full" />
                <Text className="text-black text-base leading-6">{data.instructions}</Text>
              </Section>
            )}

             <Text className="text-center text-gray-500 text-xs">
              © {new Date().getFullYear()} Touchup.ae. All Rights Reserved.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}