import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppButton } from '@/shared/ui/WhatsApp/WhatsAppButton';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col bg-surface font-sans text-primary">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};