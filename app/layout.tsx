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
    <html lang="uk">
      <body>
        <div className="page-background" aria-hidden="true">
          <div className="page-background__shape page-background__shape--one" />
          <div className="page-background__shape page-background__shape--two" />
          <div className="page-background__shape page-background__shape--three" />
        </div>
        <SiteHeader />
        <main className="site-main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
