import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { useLocale } from "next-intl";
import useTextDirection from "@/hooks/useTextDirection";
import { ClerkProvider } from "@clerk/nextjs";

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
  const direction = useTextDirection(locale);
  return (
    <ClerkProvider>
      <html lang={locale} dir={direction}>
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
