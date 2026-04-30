"use client";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-gray-50 p-4">{children}</div>;
}
