
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
  Link
} from '@react-email/components';
import type { ContactFormValues } from '@/app/[locale]/contact/actions';

interface AdminContactNoticeEmailProps {
  data: ContactFormValues;
}

export default function AdminContactNoticeEmail({ data }: AdminContactNoticeEmailProps) {
  const previewText = `New Contact Message: ${data.subject}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              New Contact Form Message
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              You have received a new message from your website's contact form.
            </Text>
            
            <Section>
                <Text className="text-black text-[14px] leading-[20px] m-0"><strong>From:</strong> {data.name}</Text>
                <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Email:</strong> <Link href={`mailto:${data.email}`}>{data.email}</Link></Text>
                <Text className="text-black text-[14px] leading-[20px] m-0"><strong>Subject:</strong> {data.subject}</Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            
            <Section>
                <Heading as="h2" className="text-black text-[20px] font-normal">Message</Heading>
                <Text className="text-black text-[14px] leading-[24px]">
                    {data.message}
                </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
