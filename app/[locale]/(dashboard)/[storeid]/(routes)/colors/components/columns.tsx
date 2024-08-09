"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useTranslations } from "next-intl"
import { useTransition } from "react"
import { CellAction } from "./cell-action"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorsColumnsType = {
  id: string
  name: string
  value: string
  createdAt: string
}

export const ColorsColumn = () => {
  const t = useTranslations("Index")

  const columns: ColumnDef<ColorsColumnsType>[] = [
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "value",
      header: t("value"),
      cell: ({ row }) => (
        <div
          className="w-5 h-5 rounded-full"
          style={{ backgroundColor: row.original.value }}
        />
      ),
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
