'use client'; // MUST be first line

import { usePathname } from 'next/navigation';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import WhatsAppButton from '@/components/whatsapp-button';
import ChatBot from '@/components/chatbot';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideLayout =
    pathname?.startsWith('/admin-signin') || pathname?.startsWith('/admin/dashboard');

  return (
    <div className="flex min-h-screen flex-col">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!hideLayout && <Footer />}
      {!hideLayout && <WhatsAppButton />}
      {!hideLayout && <ChatBot />}
    </div>
  );
}
