export const metadata = {
  title: 'AgroHub - Landing Page',
  description: 'AgroHub, a platform for farmers for better management',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  );
}
