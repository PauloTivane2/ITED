import React, { ReactNode, useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from '@/shared/ui/WhatsApp/WhatsAppButton';
import { SEO } from '@/shared/ui/SEO/SEO';
import { StructuredData } from '@/shared/ui/SEO/StructuredData';

interface PageLayoutProps {
  children: ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  const [isIframe, setIsIframe] = useState(false);

  useEffect(() => {
    setIsIframe(window !== window.top);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-surface font-sans text-primary antialiased">
      <SEO />
      <StructuredData />
      {!isIframe && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isIframe && <Footer />}
      <WhatsAppButton />
    </div>
  );
};
