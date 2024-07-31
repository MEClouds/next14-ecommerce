import { ProductsColumnsType } from "./columns"
import { Button } from "@/components/ui/button"
import {
  Copy,
  CreditCard,
  Edit,
  MoreHorizontal,
  Settings,
  Trash,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import toast from "react-hot-toast"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { AlertModal } from "@/components/modals/alert-modal"
import { useState } from "react"
import axios from "axios"

interface actionProps {
  data: ProductsColumnsType
}
export const CellAction = ({ data }: actionProps) => {
  const t = useTranslations("index")
  const params = useParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success(t("Index.Copy"))
  }

  const OnEdit = () => {
    router.push(`/${params.storeid}/products/${data.id}`)
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeid}/products/${params.productid}`)
      router.refresh()
      router.push(`/${params.storeid}/products`)
      toast.success(t("ProductDeleted"))
    } catch (error) {
      toast.error(t("ProductDeleteErorr"))
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false)
        }}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="p-0 w-8 h-8">
            <span className=" sr-only">Open Menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>{t("Action")}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="me-2 h-4 w-4" />
            {t("CopyID")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={OnEdit}>
            <Edit className="me-2 h-4 w-4" />
            {t("Update")}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="me-2 h-4 w-4" />
            {t("Delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
