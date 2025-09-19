// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import LayoutContent from './Layoutcontent';

const inter = Inter({ subsets: ['latin'] });

// Metadata for SEO, favicon, and Google verification
export const metadata: Metadata = {
  title: 'Keys Fintech | Strategic Financial Consulting',
  description:
    'Professional Strategic Financial Consulting including Life Insurance, Health Insurance, Mutual Funds, and Investment Guidance.',
  icons: '/assets/logo.png',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <LayoutContent>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}
