import prismadb from "@/lib/prismadb";
import { CategoriesClient } from "./components/client";
import { CategoriesColumns } from "./components/columns";
import { format } from "date-fns";
const CategoriesPage = async ({ params }: { params: { storeid: string } }) => {
  const Categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeid,
    },
  });

  const formatedData: CategoriesColumns[] = Categories.map(
    (item: CategoriesColumns) => ({
      id: item.id,
      name: item.name,
      billboardId: item.billboardId,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  );
  console.log(formatedData);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formatedData} />
      </div>
    </div>
  );
};

export default CategoriesPage;
