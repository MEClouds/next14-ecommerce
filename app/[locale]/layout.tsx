import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import useTextDirection from "@/hooks/useTextDirection";
import { ClerkProvider } from "@clerk/nextjs";
import { arSA, enUS } from "@clerk/localizations";
import ModalProvider from "@/providers/model-provider";
import { ToasterProvider } from "@/providers/toast-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "e-commerce Admin dashboard",
  description: "Admin Dashboard",
};
type Props = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Props) {
  const locale = useLocale();
  const normalizeLocale = locale == "ar" ? arSA : enUS;
  const messages = useMessages();
  const direction = useTextDirection(locale);
  return (
    <ClerkProvider localization={normalizeLocale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <html lang={locale} dir={direction}>
          <body className={inter.className}>
            <ToasterProvider />
            <ModalProvider />
            {children}
          </body>
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  );
}
