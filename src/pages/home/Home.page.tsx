import { Hero } from '@/widgets/hero/Hero';
import { ServicesSection } from '@/widgets/sections/ServicesSection';
import { TestimonialsSection } from '@/widgets/sections/TestimonialsSection';

export const HomePage = () => {
  return (
    <>
      <Hero />
      <ServicesSection />
      <TestimonialsSection />
    </>
  );
};