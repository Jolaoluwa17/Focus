import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Focus",
  description:
    "Discover stylish and affordable clothing for men, women, and kids. Shop the latest fashion trends, timeless essentials, and exclusive collections all in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
