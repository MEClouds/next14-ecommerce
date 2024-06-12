"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { CategoriesColumn, CategoriesColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CategoriesData {
  data: CategoriesColumns[];
}

export const CategoriesClient = ({ data }: CategoriesData) => {
  const columns = CategoriesColumn();
  const t = useTranslations("Index");
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title={t("Categories") + ` (${data.length})`}
          description={t("CategoriesDesc")}
        />
        <Button
          onClick={() => router.push(`/${params.storeid}/categories/new`)}
        >
          <Plus className="me-2 h-4 w-4" />
          {t("AddNew")}
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title={t("API")} description={t("APIDescription")} />
      <Separator />
      <ApiList entityId="categoryid" entityName="Categories" />
    </>
  );
};
