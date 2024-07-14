import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

const categoryPage = async ({
  params,
}: {
  params: { categoryid: string; storeid: string };
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryid,
    },
  });
  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeid,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-5 ">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
      {/* category page{category?.label} */}
    </div>
  );
};

export default categoryPage;
