import { BookingFormValues } from '@/app/booking/actions';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface AdminBookingNoticeEmailProps {
  data: BookingFormValues;
}

export default function AdminBookingNoticeEmail({ data }: AdminBookingNoticeEmailProps) {
  const previewText = `New booking from ${data.name} for ${data.service}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Booking Request</Heading>
          
          <Section style={section}>
            <Text style={label}>Customer Details:</Text>
            <Text style={text}><strong>Name:</strong> {data.name}</Text>
            <Text style={text}><strong>Email:</strong> {data.email}</Text>
            <Text style={text}><strong>Phone:</strong> {data.phone}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Booking Details:</Text>
            <Text style={text}><strong>Service:</strong> {data.service}</Text>
            <Text style={text}>
              <strong>Date & Time:</strong> {new Date(data.date).toLocaleDateString()} at {data.time}
            </Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Property Details:</Text>
            <Text style={text}><strong>Property Type:</strong> {data.propertyType}</Text>
            <Text style={text}><strong>Specifics:</strong> {data.specificPropertyType}</Text>
            <Text style={text}>
                <strong>Address:</strong> {data.apartmentVilla}, {data.building}, {data.street}, {data.area}, {data.city}
            </Text>
          </Section>

          {data.instructions && (
            <Section style={section}>
              <Text style={label}>Special Instructions:</Text>
              <Text style={text}>{data.instructions}</Text>
            </Section>
          )}

        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  padding: '0',
};

const section = {
  padding: '0 24px',
};

const label = {
    color: '#555',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
    borderBottom: '1px solid #eee',
    paddingBottom: '4px',
};

const text = {
  color: '#555',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 8px 0',
};
