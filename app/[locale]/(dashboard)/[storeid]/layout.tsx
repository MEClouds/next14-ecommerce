import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface DashboardProps {
  children: React.ReactNode;
  params: { storeid: string };
}

export default async function Dashboard({ children, params }: DashboardProps) {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  console.log(params.storeid);
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeid,
      userId,
    },
  });

  if (!store) {
    redirect("/");
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1300px]">{children}</div>
    </>
  );
}
