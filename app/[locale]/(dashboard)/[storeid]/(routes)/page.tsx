import prismadb from "@/lib/prismadb";
import { getTranslations } from "next-intl/server";

interface DashboardPageProps {
  params: { storeid: string };
}
const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeid,
    },
  });
  const t = await getTranslations("Index");
  return (
    <div className="m-4">
      {t("StoreDashboard")}
      {store?.name}
    </div>
  );
};

export default DashboardPage;
