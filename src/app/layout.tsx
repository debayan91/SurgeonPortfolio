import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { AppLayout } from '@/components/layout/app-layout';

export const metadata: Metadata = {
  title: 'Surgical Insights: Dr. Debashis Dutta',
  description: 'An application for surgical video analysis and learning.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{colorScheme: "dark"}} suppressHydrationWarning>
      <head/>
      <body className="font-sans antialiased bg-background text-foreground">
        <AppLayout>
            {children}
        </AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
