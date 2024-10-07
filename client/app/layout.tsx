import React from 'react';
import { Poppins } from 'next/font/google';
import '../assets/css/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// fonts
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
  weight: '400',
});

export const metadata = {
  title: 'AgroHub',
  description: 'AgroHub, a platform for farmers for better management',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <link
        rel='icon'
        href='/icon?<generated>'
        type='image/png'
        sizes='32x32'
      />
      <body className={poppins.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
