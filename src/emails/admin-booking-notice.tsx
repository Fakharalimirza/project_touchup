
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
import { format } from 'date-fns';
import type { BookingFormValues } from '@/app/[locale]/booking/actions';

interface AdminBookingNoticeEmailProps {
  data: BookingFormValues;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ? `https://${process.env.NEXT_PUBLIC_SITE_URL}` : '';

export default function AdminBookingNoticeEmail({ data }: AdminBookingNoticeEmailProps) {
  const previewText = `New Booking Request from ${data.name}`;

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
              New Booking Request
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              You have received a new booking request. Please see the details below and follow up with the customer as soon as possible.
            </Text>
            <Section>
              <Heading as="h2" className="text-black text-[20px] font-normal mt-[30px]">Customer Details</Heading>
              <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Name:</strong> {data.name}</Text>
              <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Email:</strong> {data.email}</Text>
              <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Phone:</strong> {data.phone}</Text>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Section>
               <Heading as="h2" className="text-black text-[20px] font-normal">Booking Details</Heading>
               <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Service:</strong> {data.service}</Text>
               <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Property Type:</strong> {data.propertyType}</Text>
               <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Property Details:</strong> {data.specificPropertyType}</Text>
               <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Preferred Date:</strong> {format(data.date, 'PPP')}</Text>
               <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Preferred Time:</strong> {data.time}</Text>
            </Section>
             <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
             <Section>
                <Heading as="h2" className="text-black text-[20px] font-normal">Address</Heading>
                <Text className="text-black text-[14px] leading-[20px] m-0">
                  {data.apartmentVilla}, {data.building}<br />
                  {data.street}, {data.area}<br />
                  {data.city}
                </Text>
             </Section>
            {data.instructions && (
              <>
                <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
                <Section>
                  <Heading as="h2" className="text-black text-[20px] font-normal">Special Instructions</Heading>
                  <Text className="text-black text-[14px] leading-[24px]">{data.instructions}</Text>
                </Section>
              </>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
