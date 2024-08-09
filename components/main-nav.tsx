"use client"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import React from "react"

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname()
  const params = useParams()
  const t = useTranslations("Index")
  const routes = [
    {
      href: `/${params.storeid}`,
      label: t("Overfiew"),
      active: pathname === `/${params.storeid}`,
    },
    {
      href: `/${params.storeid}/settings`,
      label: t("Settings"),
      active: pathname === `/${params.storeid}/settings`,
    },
    {
      href: `/${params.storeid}/billboards`,
      label: t("billboards"),
      active: pathname === `/${params.storeid}/billboards`,
    },
    {
      href: `/${params.storeid}/categories`,
      label: t("categories"),
      active: pathname === `/${params.storeid}/categories`,
    },
    {
      href: `/${params.storeid}/sizes`,
      label: t("Sizes"),
      active: pathname === `/${params.storeid}/sizes`,
    },
    {
      href: `/${params.storeid}/colors`,
      label: t("Colors"),
      active: pathname === `/${params.storeid}/colors`,
    },
    {
      href: `/${params.storeid}/products`,
      label: t("Products"),
      active: pathname === `/${params.storeid}/products`,
    },
    {
      href: `/${params.storeid}/orders`,
      label: t("Orders"),
      active: pathname === `/${params.storeid}/orders`,
    },
  ]
  return (
    <nav className={cn("flex  items-center  gap-x-4 lg:gap-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium  transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : " text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
}
