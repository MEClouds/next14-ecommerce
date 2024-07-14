"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoriesColumns = {
  id: string;
  name: string;
  createdAt: string;
  billboardLabel: string;
};

export const CategoriesColumn = () => {
  const t = useTranslations("Index");

  const columns: ColumnDef<CategoriesColumns>[] = [
    {
      accessorKey: "name",
      header: t("Name"),
    },
    {
      accessorKey: "billboard",
      header: t("Billboard"),
      cell: ({ row }) => row.original.billboardLabel,
    },
    {
      accessorKey: "createdAt",
      header: t("Date"),
    },
    {
      id: "actions",
      cell: ({ row }) => <CellAction data={row.original} />,
    },
  ];
  return columns;
};
