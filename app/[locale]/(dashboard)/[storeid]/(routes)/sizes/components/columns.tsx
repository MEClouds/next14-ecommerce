"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type SizesColumnsType = {
  id: string;
  name: string;
  value: string;
  createdAt: string;
};

export const SizesColumn = () => {
  const t = useTranslations("Index");

  const columns: ColumnDef<SizesColumnsType>[] = [
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "value",
      header: t("value"),
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
