import React from 'react';

export const metadata = {
  title: 'Login',
};
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
