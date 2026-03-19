import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://www.threehillsequipment.com"; // update to live domain when deployed

export const metadata: Metadata = {
  title: "Three Hills Equipment | Heavy Construction Machinery in Lagos",
  description:
    "Lagos's premier supplier of durable heavy-duty construction equipment — excavators, bulldozers, cranes and more. Request a machine today.",
  metadataBase: new URL(siteUrl),

  openGraph: {
    title: "Three Hills Equipment | Heavy Construction Machinery in Lagos",
    description:
      "Lagos's premier supplier of durable heavy-duty construction equipment — excavators, bulldozers, cranes and more. Request a machine today.",
    url: siteUrl,
    siteName: "Three Hills Equipment",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Three Hills Equipment – Heavy Duty. Ready to Work.",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Three Hills Equipment | Heavy Construction Machinery in Lagos",
    description:
      "Lagos's premier supplier of durable heavy-duty construction equipment. Request a machine today.",
    images: ["/og-image.png"],
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
