import React from 'react';

export const metadata = {
  title: 'Reset Password',
};
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
