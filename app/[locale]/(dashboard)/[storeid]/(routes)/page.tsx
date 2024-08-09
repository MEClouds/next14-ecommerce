import { getGraphRevenue } from "@/actions/get-chart-data"
import { getSalesCount } from "@/actions/get-sales-count"
import { getStockCount } from "@/actions/get-stock-count"
import { getTotalRevenue } from "@/actions/get-total-revenue"
import { Overview } from "@/components/overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { formatter } from "@/lib/utils"
import { CreditCard, DollarSign, Package } from "lucide-react"
import { getTranslations } from "next-intl/server"

interface DashboardPageProps {
  params: { storeid: string }
}
const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const t = await getTranslations("Index")
  const totalRevenue = await getTotalRevenue(params.storeid)
  const salesCount = await getSalesCount(params.storeid)
  const stockCount = await getStockCount(params.storeid)
  const grahData = await getGraphRevenue(params.storeid)
  return (
    <div className="flex-col ">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title={t("Dashboard")} description={t("DashboardDisc")} />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {t("TotalRevenue")}
              </CardTitle>
              <DollarSign className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className=" font-bold text-2xl">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {t("Sales")}
              </CardTitle>
              <CreditCard className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className=" font-bold text-2xl">+{salesCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium">
                {t("InStock")}
              </CardTitle>
              <Package className="w-5 h-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className=" font-bold text-2xl">{stockCount}</div>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t("overview")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Overview data={grahData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
