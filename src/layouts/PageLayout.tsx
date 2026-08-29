import React, { ReactNode, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from '@/shared/ui/WhatsApp/WhatsAppButton';
import { SEO } from '@/shared/ui/SEO/SEO';
import { StructuredData } from '@/shared/ui/SEO/StructuredData';
import { EnterpriseBackground } from '@/shared/ui/Background/EnterpriseBackground';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isIframe, setIsIframe] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsIframe(window !== window.top);
  }, []);

  // Automatic scroll handling on route & hash change with async retry & header offset
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }

    const id = location.hash.replace('#', '');
    let attempts = 0;
    
    const scrollToTarget = () => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 90;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      } else if (attempts < 25) {
        attempts++;
        setTimeout(scrollToTarget, 60);
      }
    };

    const timer = setTimeout(scrollToTarget, 80);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <EnterpriseBackground className="flex flex-col min-h-screen font-sans text-slate-100 antialiased selection:bg-accent/30 selection:text-white">
      <SEO />
      <StructuredData />
      {!isIframe && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isIframe && <Footer />}
      <WhatsAppButton />
    </EnterpriseBackground>
  );
};
