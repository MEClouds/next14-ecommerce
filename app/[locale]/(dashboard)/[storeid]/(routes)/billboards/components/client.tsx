"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { BillboardsColumn, BillboardsColumns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BillboardsData {
  data: BillboardsColumns[];
}

export const BillboardClient = ({ data }: BillboardsData) => {
  const columns = BillboardsColumn();
  const t = useTranslations("Index");
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className=" flex items-center justify-between">
        <Heading
          title={t("billboards") + ` (${data.length})`}
          description={t("billboardsDesc")}
        />
        <Button
          onClick={() => router.push(`/${params.storeid}/billboards/new`)}
        >
          <Plus className="me-2 h-4 w-4" />
          {t("AddNew")}
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="label" columns={columns} data={data} />
      <Heading title={t("API")} description={t("APIDescription")} />
      <Separator />
      <ApiList entityId="billboardId" entityName="billboards" />
    </>
  );
};
