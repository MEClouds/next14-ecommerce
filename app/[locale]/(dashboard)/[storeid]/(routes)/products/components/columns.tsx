"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { useTransition } from "react"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductsColumnsType = {
  id: string
  name: string
  price: string
  category: string
  size: string
  color: string
  isArchived: boolean
  isFeatured: boolean
  createdAt: string
}

export const ProductsColumns = () => {
  const t = useTranslations("Index")

  const columns: ColumnDef<ProductsColumnsType>[] = [
    {
      accessorKey: "name",
      header: t("Name"),
    },
    {
      accessorKey: "price",
      header: t("Price"),
    },
    {
      accessorKey: "category",
      header: t("category"),
    },
    {
      accessorKey: "size",
      header: t("Size"),
    },
    {
      accessorKey: "color",
      header: t("Color"),
      cell: ({ row }) => (
        <div className="flex items-center gap-x-2">
          {row.original.color}
          <div
            className="w-6 h-6 rounded-full border"
            style={{ backgroundColor: row.original.color }}
          />
        </div>
      ),
    },
    {
      accessorKey: "isFeatured",
      header: t("isFeatured"),
    },
    {
      accessorKey: "isArchived",
      header: t("isArchived"),
    },
    {
      accessorKey: "createdAt",
      header: t("Date"),
    },
    {
      id: "actions",
      cell: ({ row }) => <CellAction data={row.original} />,
    },
  ]
  return columns
}
