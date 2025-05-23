import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Project Explorer",
  description: "Find your inspiration on GitHub",
  openGraph: {
    title: "Project Explorer",
    description: "Find your inspiration on GitHub",
    type: "website",
    url: "https://project-explorer-sigma.vercel.app",
    images: [
      {
        url: "https://project-explorer-sigma.vercel.app/opengraph-image.png",
      },
      {
        url: "https://project-explorer-sigma.vercel.app/og-image.png",
        alt: "My custom alt",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
