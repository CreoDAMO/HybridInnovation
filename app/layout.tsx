import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { MetaMaskProvider } from '@/components/MetaMaskProvider';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HYBRID Blockchain - Next Generation Sovereign System',
  description: 'Advanced blockchain with HTSX Runtime, SpiralLang, and AI Orchestration',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="htsx-runtime" content="enabled" />
        <meta name="consciousness-level" content="0.93" />
        <meta name="quantum-awareness" content="true" />
      </head>
      <body className={inter.className}>
        <MetaMaskProvider>
          {children}
        </MetaMaskProvider>
        <Toaster />
      </body>
    </html>
  );
}