"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { SizesColumn, SizesColumnsType } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface SizesData {
  data: SizesColumnsType[];
}

export const SizeClient = ({ data }: SizesData) => {
  const columns = SizesColumn();
  const t = useTranslations("Index");
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title={t("Sizes") + ` (${data.length})`}
          description={t("SizesDesc")}
        />
        <Button onClick={() => router.push(`/${params.storeid}/sizes/new`)}>
          <Plus className="me-2 h-4 w-4" />
          {t("AddNew")}
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title={t("API")} description={t("APISizesDescription")} />
      <Separator />
      <ApiList entityId="sizeId" entityName="sizes" />
    </>
  );
};
