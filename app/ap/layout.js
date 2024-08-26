import { Poppins } from 'next/font/google';
import './globals.css';

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

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
