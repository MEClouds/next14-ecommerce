import prismadb from "@/lib/prismadb"
import { ProductsClient } from "./components/client"
import { ProductsColumnsType } from "./components/columns"
import { format } from "date-fns"
import { formatter } from "@/lib/utils"
import { Product } from "@prisma/client"
const ProductsPage = async ({ params }: { params: { storeid: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeid,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formatedData: ProductsColumnsType[] = products.map((item: Product) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    category: item.category.name,
    size: item.size.name,
    color: item.color.value,
    price: formatter.format(item.price.toNumber()),
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }))
  console.log(formatedData)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formatedData} />
      </div>
    </div>
  )
}

export default ProductsPage
