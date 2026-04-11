import React, { ReactNode, useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from '@/shared/ui/WhatsApp/WhatsAppButton';

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
      {!isIframe && <Header />}
      <main className="flex-grow">
        {children}
      </main>
      {!isIframe && <Footer />}
      <WhatsAppButton />
    </div>
  );
};
