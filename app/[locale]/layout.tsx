import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import useTextDirection from "@/hooks/useTextDirection";
import { ClerkProvider } from "@clerk/nextjs";
import ModalProvider from "@/providers/model-provider";

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
  const messages = useMessages();
  const direction = useTextDirection(locale);
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ClerkProvider>
        <html lang={locale} dir={direction}>
          <body className={inter.className}>
            <ModalProvider />
            {children}
          </body>
        </html>
      </ClerkProvider>
    </NextIntlClientProvider>
  );
}
