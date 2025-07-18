import { ContactFormValues } from '@/app/[locale]/contact/actions';
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

interface AdminContactNoticeEmailProps {
  data: ContactFormValues;
}

export default function AdminContactNoticeEmail({ data }: AdminContactNoticeEmailProps) {
  const previewText = `New message from ${data.name}: ${data.subject}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>New Website Contact</Heading>
          
          <Section style={section}>
            <Text style={text}><strong>From:</strong> {data.name}</Text>
            <Text style={text}><strong>Email:</strong> <a href={`mailto:${data.email}`}>{data.email}</a></Text>
            <Text style={text}><strong>Subject:</strong> {data.subject}</Text>
          </Section>

          <Section style={messageSection}>
            <Text style={label}>Message:</Text>
            <Text style={text}>{data.message}</Text>
          </Section>

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

const messageSection = {
  ...section,
  marginTop: '20px',
  padding: '20px',
  backgroundColor: '#f9f9f9',
  border: '1px solid #eee',
  borderRadius: '4px',
}

const label = {
    color: '#555',
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '8px',
};

const text = {
  color: '#555',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0 0 8px 0',
};
