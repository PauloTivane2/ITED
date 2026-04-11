import React from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { SEO } from '@/shared/ui/SEO/SEO';
import { HeroSection } from '../../widgets/HeroSection';
import { AboutSection } from '../../widgets/AboutSection';
import { ServiceTimes } from '../../widgets/ServiceTimes';
import { MinistriesList } from '../../widgets/MinistriesList';
import { EventsSection } from '../../widgets/EventsSection';
import { GallerySection } from '../../widgets/GallerySection';
import { ContactForm } from '../../features/contact/ui/ContactForm';

export const HomePage: React.FC = () => {
  return (
    <PageLayout>
      <SEO 
        title="Página Inicial" 
        description="Bem-vindo à ITED — Igreja Internacional Tenda do Encontro com Deus. Uma comunidade cristã dedicada à fé, comunhão e transformação espiritual."
        canonical="/"
      />
      <HeroSection />
      <AboutSection />
      <ServiceTimes />
      <MinistriesList />
      <EventsSection />
      <GallerySection />
      <ContactForm />
    </PageLayout>
  );
};

export default HomePage;