import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getSiteUrl } from "@/lib/env";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "MerchUA",
    template: "%s | MerchUA"
  },
  description:
    "MerchUA — актуальні вакансії для мерчендайзерів у Львові, зібрані в одному місці.",
  openGraph: {
    title: "MerchUA",
    description:
      "MerchUA — актуальні вакансії для мерчендайзерів у Львові, зібрані в одному місці.",
    type: "website",
    url: getSiteUrl(),
    siteName: "MerchUA",
    locale: "uk_UA"
  },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className="light" lang="uk">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="text-text-primary bg-surface">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
