import type { Metadata } from "next"
import { El_Messiri, Inter } from "next/font/google"
import "./globals.css"
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl"
import useTextDirection from "@/hooks/useTextDirection"
import { ClerkProvider } from "@clerk/nextjs"
import { arSA, enUS } from "@clerk/localizations"
import ModalProvider from "@/providers/model-provider"
import { ToasterProvider } from "@/providers/toast-provider"
import { isRtlLang } from "rtl-detect"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/providers/theme-provider"

const inter = Inter({ subsets: ["latin"] })
const arabicFont = El_Messiri({ subsets: ["arabic"] })

export const metadata: Metadata = {
  title: "e-commerce Admin dashboard",
  description: "Admin Dashboard",
}
type Props = {
  children: React.ReactNode
}
export default function RootLayout({ children }: Props) {
  const locale = useLocale()
  const normalizeLocale = locale == "ar" ? arSA : enUS
  const messages = useMessages()
  const direction = useTextDirection(locale)
  const dir = isRtlLang(locale) ? "rtl" : "ltr"
  const font = isRtlLang(locale) ? arabicFont : inter
  return (
    <ClerkProvider localization={normalizeLocale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <html lang={locale} dir={direction}>
          <body className={cn(" bg-gray-100 dark:bg-black", font.className)}>
            <ThemeProvider attribute="class" defaultTheme="system">
              <ToasterProvider />
              <ModalProvider />
              {children}
            </ThemeProvider>
          </body>
        </html>
      </NextIntlClientProvider>
    </ClerkProvider>
  )
}
