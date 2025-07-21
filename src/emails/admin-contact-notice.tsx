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
import type { ContactFormValues } from '@/app/[locale]/contact/actions';

interface AdminContactNoticeEmailProps {
  data: ContactFormValues;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://touchup.ae';

export default function AdminContactNoticeEmail({ data }: AdminContactNoticeEmailProps) {
  const previewText = `New Contact Message: ${data.subject}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 my-auto mx-auto font-sans">
          <Container className="border border-solid border-gray-200 rounded my-10 mx-auto p-8 w-full max-w-2xl bg-white shadow-sm">
            <Section className="mt-8">
              <Img
                src={`${baseUrl}/Images/logo-black-en.webp`}
                width="150"
                height="auto"
                alt="Touchup.ae Logo"
                className="my-0 mx-auto"
              />
            </Section>
            
            <Heading className="text-black text-2xl font-bold text-center p-0 my-8 mx-0">
              New Contact Form Message
            </Heading>
            
            <Text className="text-black text-base leading-6">
              You have received a new message from your website's contact form.
            </Text>

            <Section className="border border-solid border-gray-200 rounded-md p-6 my-8">
                <Text className="text-black text-base leading-6 m-0"><strong>From:</strong> {data.name}</Text>
                <Text className="text-black text-base leading-6 m-0"><strong>Email:</strong> <Link href={`mailto:${data.email}`} className="text-blue-600 underline">{data.email}</Link></Text>
                <Text className="text-black text-base leading-6 m-0"><strong>Subject:</strong> {data.subject}</Text>
            </Section>

            <Section className="border border-solid border-gray-200 rounded-md p-6 my-8">
                <Heading as="h2" className="text-black text-xl font-semibold m-0">Message</Heading>
                <Hr className="border border-solid border-gray-200 my-4 mx-0 w-full" />
                <Text className="text-black text-base leading-6 whitespace-pre-wrap">
                    {data.message}
                </Text>
            </Section>

            <Text className="text-center text-gray-500 text-xs mt-8">
              This email was sent from the contact form on touchup.ae
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}