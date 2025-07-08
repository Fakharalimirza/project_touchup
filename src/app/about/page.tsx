import { Metadata } from 'next';
import Image from 'next/image';
import { Target, Eye, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about TouchUp Hub, our mission, vision, and the values that drive our commitment to providing top-quality home maintenance services in Dubai.',
};

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To provide reliable, high-quality, and affordable home maintenance and cleaning solutions that exceed our clients\' expectations, ensuring their spaces are safe, comfortable, and pristine.'
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'To be Dubai\'s most trusted and sought-after home services company, known for our professionalism, efficiency, and unwavering commitment to customer satisfaction.'
  },
  {
    icon: Heart,
    title: 'Our Values',
    text: 'We operate with integrity, professionalism, and a strong work ethic. We believe in building long-term relationships with our clients based on trust and exceptional service.'
  }
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">About TouchUp Hub</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto">
            Your dedicated partner in home maintenance, committed to quality and excellence.
          </p>
        </div>
      </section>
      
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-headline text-primary">Who We Are</h2>
              <p className="text-muted-foreground">
                TouchUp Hub was founded with a simple mission: to make professional home maintenance services accessible and hassle-free for everyone in Dubai. With years of experience in the industry, our founders noticed a gap in the market for a reliable, customer-centric service provider that homeowners and businesses could truly depend on.
              </p>
              <p className="text-muted-foreground">
                Today, we are a leading name in home maintenance, with a growing team of skilled, certified, and passionate technicians. We are proud to have served over 500 homes and businesses, building a reputation for quality, integrity, and exceptional customer care.
              </p>
            </div>
            <div>
              <Image
                src="https://placehold.co/600x400.png"
                alt="TouchUp Hub team"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                data-ai-hint="maintenance workers"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-card py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center p-6">
                <div className="inline-block bg-primary/10 text-primary p-4 rounded-full mb-4">
                  <value.icon className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-semibold font-headline mb-2">{value.title}</h3>
                <p className="text-muted-foreground">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
