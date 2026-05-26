import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Footer, Header } from "@/components/SiteShell";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JMS Universal Technologies | Turnkey Retail Execution",
  description:
    "Premium turnkey manufacturing, fabrication, fixtures, furniture, facade systems, signage, and retail execution solutions across India.",
  openGraph: {
    title: "JMS Universal Technologies Pvt. Ltd.",
    description: "We enhance brands worldwide through scalable retail environments.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
