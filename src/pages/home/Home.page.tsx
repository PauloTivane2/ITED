import React from 'react';
import { PageLayout } from '../../layouts/PageLayout';
import { HeroSection } from '../../widgets/HeroSection';
import { AboutSection } from '../../widgets/AboutSection';
import { ServiceTimes } from '../../widgets/ServiceTimes';
import { MinistriesList } from '../../widgets/MinistriesList';
import { EventsSection } from '../../widgets/EventsSection';
import { GallerySection } from '../../widgets/GallerySection';
import { ContactForm } from '../../features/ContactForm';

export const HomePage: React.FC = () => {
  return (
    <PageLayout>
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