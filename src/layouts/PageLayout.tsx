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

  // Automatic scroll handling on route & hash change
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
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
