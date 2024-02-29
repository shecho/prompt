import type { Metadata } from 'next';
import './globals.css';
import Providers from './utils/providers';
import { Nunito_Sans } from 'next/font/google';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'wizeprompt',
  description: 'Centralizes access to multiple Generative AI services,',
};
const nunitoSans = Nunito_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-nunito_sans' });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang='en' className={`${nunitoSans.className} ${nunitoSans.variable} bg-wl-cyan-3 font-sans`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
