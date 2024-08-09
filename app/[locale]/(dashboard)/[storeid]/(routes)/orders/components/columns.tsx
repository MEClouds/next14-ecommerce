"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useTranslations } from "next-intl"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type OrderColumnType = {
  id: string
  phone: string
  address: string
  totalPrice: string
  products: string
  isPaid: boolean
  createdAt: string
}

export const OrdersColumn = () => {
  const t = useTranslations("Index")

  const columns: ColumnDef<OrderColumnType>[] = [
    {
      accessorKey: "products",
      header: t("Products"),
    },
    {
      accessorKey: "phone",
      header: t("Phone"),
    },
    {
      accessorKey: "address",
      header: t("Address"),
    },
    {
      accessorKey: "totalPrice",
      header: t("totalPrice"),
    },
    {
      accessorKey: "isPaid",
      header: t("isPaid"),
    },
    {
      accessorKey: "createdAt",
      header: t("Date"),
    },
  ]
  return columns
}
