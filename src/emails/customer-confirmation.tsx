import { BookingFormValues } from '@/app/booking/actions';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface CustomerConfirmationEmailProps {
  name: string;
  data: BookingFormValues;
}

const baseUrl = 'https://touchup.ae';

export default function CustomerConfirmationEmail({ name, data }: CustomerConfirmationEmailProps) {
  const previewText = `Your booking for ${data.service} is received!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/wp-content/uploads/2021/08/Screenshot_2024-03-27_125327-removebg-preview.png`}
            width="150"
            height="50"
            alt="TouchUp Hub"
            style={logo}
          />
          <Heading style={h1}>Thank you for choosing TouchUp Hub!</Heading>
          <Text style={text}>
            Hi {name},
          </Text>
          <Text style={text}>
            We have received your booking request and a member of our team will contact you shortly to confirm the details.
          </Text>

          <Section style={bookingDetails}>
            <Text style={label}>Your Request Summary:</Text>
            <Text style={detailItem}><strong>Service:</strong> {data.service}</Text>
            <Text style={detailItem}><strong>Date:</strong> {new Date(data.date).toLocaleDateString()}</Text>
            <Text style={detailItem}><strong>Time:</strong> {data.time}</Text>
          </Section>

          <Text style={text}>
            We look forward to serving you!
          </Text>
          
          <Button style={button} href={baseUrl}>
            Visit Our Website
          </Button>

          <Text style={footer}>
            TouchUp Hub, A202 - Sport Society Mall - Mirdif - Dubai
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  border: '1px solid #f0f0f0',
  borderRadius: '4px',
};

const logo = {
  margin: '0 auto',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '24px',
  fontWeight: 'bold',
  textAlign: 'center' as const,
  margin: '30px 0',
  padding: '0',
};

const text = {
  color: '#3c4043',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  padding: '0 24px',
};

const bookingDetails = {
    margin: '24px',
    padding: '16px',
    border: '1px solid #eee',
    borderRadius: '5px',
    backgroundColor: '#fafafa',
};

const label = {
    fontWeight: '600',
    color: '#333',
    fontSize: '16px',
    marginBottom: '10px',
};

const detailItem = {
    color: '#555',
    fontSize: '14px',
    lineHeight: '22px',
    margin: '0 0 8px 0',
};

const button = {
  backgroundColor: '#1890ff', // A sample primary color
  borderRadius: '3px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '200px',
  padding: '12px',
  margin: '24px auto',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  textAlign: 'center' as const,
  padding: '0 24px',
};
