import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Nav from "@/_components/Nav";
import QueryProvider from "@/_react-query/QueryProvider";
import Footer from "@/_components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VerseVault | Bible Verses & Daily Scripture",
  description:
    "VerseVault helps you explore the Bible, search by chapter or topic, and get inspired with daily scripture verses.",
  keywords: [
    "Bible",
    "Scripture",
    "Daily Verse",
    "Bible topics",
    "Faith",
    "Devotionals",
    "Old Testament",
    "New Testament",
  ],
  authors: [{ name: "VerseVault Team" }],
  openGraph: {
    title: "VerseVault | Discover Bible Verses Anytime",
    description:
      "Browse, search, and reflect on thousands of Bible verses. VerseVault is your online scripture companion.",
    url: "https://www.versevault.com",
    siteName: "VerseVault",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "VerseVault – Bible Verse Website",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VerseVault | Bible Verses for Daily Life",
    description:
      "Explore powerful Bible verses organized by topic, book, and keyword. Stay inspired with a verse of the day.",
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <QueryProvider>
          <Nav />
          {children}
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}
