import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
  Tailwind,
} from '@react-email/components';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://touchup.ae';

export default function TestEmail() {
  const previewText = `This is a test email from Touchup.ae`;

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
              Email Configuration Test
            </Heading>
            <Text className="text-black text-base leading-6">
              Hello,
            </Text>
            <Text className="text-black text-base leading-6">
              If you have received this email, it means your Resend configuration for Touchup.ae is working correctly.
            </Text>
            <Text className="text-black text-base leading-6">
                — The Touchup Building Maintenance Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}