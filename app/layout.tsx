import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { SavedPantriesProvider } from '@/lib/SavedPantriesContext';
import { LocationProvider } from '@/lib/LocationContext';

const nunito = Nunito({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'My Pantry',
  description: 'Find free food near you',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.variable}>
        <LocationProvider>
          <SavedPantriesProvider>
            {children}
            <Navbar />
          </SavedPantriesProvider>
        </LocationProvider>
      </body>
    </html>
  );
}
