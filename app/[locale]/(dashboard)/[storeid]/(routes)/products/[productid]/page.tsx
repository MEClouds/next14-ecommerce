import prismadb from "@/lib/prismadb"
import { ProductForm } from "./components/product-form"

const ProductPage = async ({
  params,
}: {
  params: { productid: string; storeid: string }
}) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productid,
    },
    include: {
      images: true,
    },
  })
  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeid,
    },
  })
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeid,
    },
  })
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeid,
    },
  })
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-5 ">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
      {/* Billboard page{billboard?.label} */}
    </div>
  )
}

export default ProductPage
