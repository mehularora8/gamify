import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "20 Words or Less",
  description: "Classic word game where you guess the secrets in 20 words or less.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3263526606309588" crossOrigin="anonymous"></script>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
