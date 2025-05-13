import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Link Share",
  description: "Share your links with the world",
  generator: "Ankur Sharma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
