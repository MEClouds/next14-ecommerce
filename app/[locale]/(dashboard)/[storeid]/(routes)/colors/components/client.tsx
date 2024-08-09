"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { ColorsColumn, ColorsColumnsType } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ColorsData {
  data: ColorsColumnsType[]
}

export const ColorClient = ({ data }: ColorsData) => {
  const columns = ColorsColumn()
  const t = useTranslations("Index")
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title={t("Colors") + ` (${data.length})`}
          description={t("ColorsDesc")}
        />
        <Button onClick={() => router.push(`/${params.storeid}/colors/new`)}>
          <Plus className="me-2 h-4 w-4" />
          {t("AddNew")}
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title={t("API")} description={t("APIColorsDescription")} />
      <Separator />
      <ApiList entityId="sizeId" entityName="colors" />
    </>
  )
}
