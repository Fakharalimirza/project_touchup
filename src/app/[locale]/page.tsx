
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { services } from '@/lib/data';
import { Users, DollarSign, Clock, LifeBuoy, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

const whyChooseUsKeys = ['experienced', 'affordable', 'reliable', 'support'] as const;
const testimonialKeys = ['ahmed', 'fatima', 'john'] as const;
const whyChooseUsIcons = {
  experienced: Users,
  affordable: DollarSign,
  reliable: Clock,
  support: LifeBuoy,
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};


export default function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const t = useTranslations('Home');
  const tServices = useTranslations('Services');
  const tGeneral = useTranslations('General');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-[90vh] w-full flex items-center justify-center text-center text-white overflow-hidden">
        <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.05, 1], x: [0, -20, 0] }}
            transition={{ duration: 25, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
        >
            <Image
                src="https://touchup.ae/wp-content/uploads/2023/10/test.jpg"
                alt="Technician working on an air conditioner"
                fill
                className="object-cover"
                priority
                data-ai-hint="cleaning team"
            />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-black/60" />
        <motion.div
            className="relative z-10 max-w-4xl mx-auto px-4 flex flex-col items-center"
            initial="hidden"
            animate="visible"
            variants={sectionVariants}
        >
            <motion.h1
                variants={itemVariants}
                className="text-4xl md:text-7xl font-bold font-headline mb-4"
            >
                {t('heroTitle')}
            </motion.h1>
            <motion.p
                 variants={itemVariants}
                className="text-lg md:text-xl mb-8"
            >
                {t('heroSubtitle')}
            </motion.p>
            <motion.div variants={itemVariants}>
                <Button asChild size="lg">
                    <Link href="/booking">{t('heroButton')}</Link>
                </Button>
            </motion.div>
        </motion.div>

        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 5, duration: 1 }}
            >
              <motion.div
                animate={{
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <a href="#services">
                  <ChevronDown className="h-10 w-10 text-white/70 hover:text-white transition-colors" />
                  <span className="sr-only">Scroll to services</span>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Services Overview */}
      <motion.section
        id="services"
        className="py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">{t('servicesTitle')}</h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              {t('servicesSubtitle')}
            </p>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-8">
            {services.map((service) => (
              <motion.div key={service.slug} variants={itemVariants} whileHover={{ y: -8, scale: 1.03 }} className="w-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.333%-1.34rem)]">
                <Card className="text-center transition-all duration-300 glow-border bg-card/50 backdrop-blur-sm h-full flex flex-col">
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary rounded-full p-4 w-fit mb-4">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <CardTitle className="font-headline">{tServices(service.titleKey)}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col justify-between">
                    <p className="text-muted-foreground mb-4">{tServices(service.descriptionKey)}</p>
                    <Button asChild variant="outline">
                      <Link href={`/services/${service.slug}`}>{tGeneral('learnMore')}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Us */}
      <motion.section
        className="py-16 md:py-24 bg-card/50"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">{t('whyChooseUsTitle')}</h2>
            <p className="text-lg text-muted-foreground mt-2">
              {t('whyChooseUsSubtitle')}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsKeys.map((itemKey) => {
              const Icon = whyChooseUsIcons[itemKey];
              return (
              <motion.div key={itemKey} variants={itemVariants} className="flex flex-col items-center text-center p-4 rounded-lg transition-all duration-300 hover:bg-primary/10">
                <div className="bg-accent/20 text-accent p-4 rounded-full mb-4 transition-all duration-300 transform-gpu hover:scale-110 hover:shadow-[0_0_20px_hsl(var(--accent))]">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{t(`whyChooseUsItems.${itemKey}.title`)}</h3>
                <p className="text-muted-foreground">{t(`whyChooseUsItems.${itemKey}.description`)}</p>
              </motion.div>
            )})}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-16 md:py-24"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-headline text-primary">{t('testimonialsTitle')}</h2>
            <p className="text-lg text-muted-foreground mt-2">
              {t('testimonialsSubtitle')}
            </p>
          </motion.div>
          <Carousel
            opts={{ align: 'start', loop: true }}
            className="w-full max-w-4xl mx-auto"
          >
            <CarouselContent>
              {testimonialKeys.map((testimonialKey, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div className="p-1 h-full" variants={itemVariants} whileHover={{ y: -5, scale: 1.03 }}>
                    <Card className="h-full glow-border bg-card/50 backdrop-blur-sm">
                      <CardContent className="flex flex-col items-center text-center p-6 h-full">
                        <Avatar className="w-20 h-20 mb-4 border-2 border-primary">
                          <AvatarImage src={`https://placehold.co/100x100.png?text=${index}`} alt={t(`testimonials.${testimonialKey}.name`)} />
                          <AvatarFallback>{t(`testimonials.${testimonialKey}.name`).charAt(0)}</AvatarFallback>
                        </Avatar>
                        <p className="text-muted-foreground italic mb-4 flex-grow">"{t(`testimonials.${testimonialKey}.quote`)}"</p>
                        <p className="font-semibold">{t(`testimonials.${testimonialKey}.name`)}</p>
                        <p className="text-sm text-muted-foreground">{t(`testimonials.${testimonialKey}.title`)}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-primary via-accent to-primary/80 text-primary-foreground"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        >
        <div className="container text-center">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold font-headline mb-4">{t('ctaTitle')}</motion.h2>
          <motion.p variants={itemVariants} className="text-lg mb-8 max-w-2xl mx-auto">
            {t('ctaSubtitle')}
          </motion.p>
          <motion.div variants={itemVariants}>
            <Button asChild size="lg" variant="secondary">
              <Link href="/booking">{t('ctaButton')}</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

    