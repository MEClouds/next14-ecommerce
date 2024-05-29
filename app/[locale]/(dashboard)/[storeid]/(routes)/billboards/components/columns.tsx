"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardsColumns = {
  id: string;
  label: string;
  createdAt: string;
};

export const BillboardsColumn = () => {
  const t = useTranslations("Index");

  const columns: ColumnDef<BillboardsColumns>[] = [
    {
      accessorKey: "label",
      header: t("label"),
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
