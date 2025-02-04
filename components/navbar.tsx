import { UserButton, auth } from "@clerk/nextjs"
import { MainNav } from "./main-nav"
import StoreSwitcher from "./store-switcher"
import { redirect } from "next/navigation"
import prismadb from "@/lib/prismadb"
import { LanguagesSwitch } from "./language-switch"
import { ModeToggle } from "./toggle-theme"
import Link from "next/link"
import { Button } from "./ui/button"
import { StoreLink } from "./store-link"

const Navbar = async () => {
  const { userId } = auth()
  if (!userId) {
    redirect("/sign-in")
  }
  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  })
  return (
    <div className="border-b">
      <div className="flex h-14 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="mx-6" />
        <div className=" ms-auto flex items-center space-x-4">
          <StoreLink />
          <LanguagesSwitch />
          <UserButton afterSignOutUrl="/" />
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}

export default Navbar
