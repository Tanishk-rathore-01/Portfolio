import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Tanishk Rathore | Full Stack Developer",
  description:
    "Premium AI-inspired portfolio for Tanishk Rathore, a full stack developer building responsive web apps with React, TypeScript, Tailwind CSS, Node.js, Supabase, PostgreSQL, and AI tooling.",
  authors: [{ name: "Tanishk Rathore" }],
  creator: "Tanishk Rathore",
  metadataBase: new URL("https://tanishk-rathore-portfolio.vercel.app"),
  openGraph: {
    title: "Tanishk Rathore | Full Stack Developer",
    description:
      "Full stack developer portfolio featuring AI products, SaaS systems, healthcare dashboards, marketplace flows, and responsive frontend builds.",
    type: "website",
    images: [
      {
        url: "/assets/avatar.jpg",
        width: 960,
        height: 960,
        alt: "Tanishk Rathore avatar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tanishk Rathore | Full Stack Developer",
    description:
      "Recruiter-focused portfolio with AI, full-stack, Supabase, and responsive UI projects.",
    images: ["/assets/avatar.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05070d",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
