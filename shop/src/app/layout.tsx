import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Protected from '@/components/Protected';
import Providers from '@/components/Providers';
import NavBar from '@/components/navBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Toy Store Dashboard',
  description: 'Management dashboard for toy store',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Protected>
            <NavBar />
            <div className="pt-16">{children}</div>
          </Protected>
        </Providers>
      </body>
    </html>
  );
}
