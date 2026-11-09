import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grid Newspaper - The New Coder Times",
  description: "The New Coder Times - Teknoloji ve yazılım geliştirme haberleri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
