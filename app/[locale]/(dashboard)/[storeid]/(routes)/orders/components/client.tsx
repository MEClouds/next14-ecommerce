"use client"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"

import { useTranslations } from "next-intl"

import { OrderColumnType, OrdersColumn } from "./columns"
import { DataTable } from "@/components/ui/data-table"

interface OrdersData {
  data: OrderColumnType[]
}

export const OrdersClient = ({ data }: OrdersData) => {
  const columns = OrdersColumn()
  const t = useTranslations("Index")

  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title={t("Orders") + ` (${data.length})`}
          description={t("OrdersDesc")}
        />
      </div>
      <Separator />
      <DataTable searchKey="products" columns={columns} data={data} />
    </>
  )
}
