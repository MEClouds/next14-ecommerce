import prismadb from "@/lib/prismadb";
import { SizeClient } from "./components/client";
import { SizesColumnsType } from "./components/columns";
import { format } from "date-fns";
const SizesPage = async ({ params }: { params: { storeid: string } }) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeid,
    },
  });

  const formatedData: SizesColumnsType[] = sizes.map(
    (item: SizesColumnsType) => ({
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );
  console.log(formatedData);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formatedData} />
      </div>
    </div>
  );
};

export default SizesPage;
