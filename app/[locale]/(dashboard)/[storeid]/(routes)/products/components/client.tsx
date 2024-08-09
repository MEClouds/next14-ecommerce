"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { ProductsColumns, ProductsColumnsType } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ProductsData {
  data: ProductsColumnsType[]
}

export const ProductsClient = ({ data }: ProductsData) => {
  const columns = ProductsColumns()
  const t = useTranslations("Index")
  const router = useRouter()
  const params = useParams()
  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title={t("products") + ` (${data.length})`}
          description={t("productsDesc")}
        />
        <Button onClick={() => router.push(`/${params.storeid}/products/new`)}>
          <Plus className="me-2 h-4 w-4" />
          {t("AddNew")}
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title={t("API")} description={t("productsAPIDescription")} />
      <Separator />
      <ApiList entityId="productId" entityName="products" />
    </>
  )
}
