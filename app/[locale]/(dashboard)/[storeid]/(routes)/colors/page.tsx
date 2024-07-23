import prismadb from "@/lib/prismadb"
import { ColorClient } from "./components/client"
import { ColorsColumnsType } from "./components/columns"
import { format } from "date-fns"
const ColorsPage = async ({ params }: { params: { storeid: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeid,
    },
  })

  const formatedData: ColorsColumnsType[] = colors.map(
    (item: ColorsColumnsType) => ({
      id: item.id,
      name: item.name,
      value: item.value,
      createdAt: format(item.createdAt, "MMMM do, yyyy"),
    })
  )
  console.log(formatedData)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formatedData} />
      </div>
    </div>
  )
}

export default ColorsPage
