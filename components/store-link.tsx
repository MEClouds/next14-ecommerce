"use client"
import Link from "next/link"
import { Button } from "./ui/button"
import { useParams } from "next/navigation"
import { useTranslations } from "next-intl"

type Props = {}
export const StoreLink = ({}: Props) => {
  const t = useTranslations("Index")
  const params = useParams()
  const storefront = `${process.env.FRONTEND_STORE_URL}/${params.storeid}`
  return (
    <Button asChild size={"sm"}>
      <Link href={storefront} target="_blank">
        {t("Storefront")}
      </Link>
    </Button>
  )
}
