import prismadb from "@/lib/prismadb";
import { BillboardClient } from "./components/client";
import { BillboardsColumns } from "./components/columns";
import { format } from "date-fns";
const BillboardsPage = async ({ params }: { params: { storeid: string } }) => {
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeid,
    },
  });

  const formatedData: BillboardsColumns[] = billboards.map(
    (item: BillboardsColumns) => ({
      id: item.id,
      label: item.label,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );
  console.log(formatedData);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formatedData} />
      </div>
    </div>
  );
};

export default BillboardsPage;
