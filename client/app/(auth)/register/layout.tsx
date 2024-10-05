import React from "react";

export const metadata = {
  title: 'Register',
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
