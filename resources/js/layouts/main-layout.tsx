import React from 'react';
import { Head } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

export default function MainLayout({
  children,
  title = "IN-NOVA",
  description,
  className = ""
}: MainLayoutProps) {
  return (
    <>
      <Head title={title}>
        {description && <meta name="description" content={description} />}
      </Head>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className={`flex-1 w-full ${className}`}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
