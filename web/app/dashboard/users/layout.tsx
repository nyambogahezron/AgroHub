import type { Metadata } from 'next';
import React from 'react';

export const metadata = {
  title: `Dashboard | Users`,
} satisfies Metadata;

export default function BudgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
