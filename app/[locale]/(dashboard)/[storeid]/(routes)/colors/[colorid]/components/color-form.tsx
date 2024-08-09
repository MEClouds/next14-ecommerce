"use client"

import { AlertModal } from "@/components/modals/alert-modal"
import { ApiALert } from "@/components/ui/api-alert"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Heading } from "@/components/ui/heading"
import ImageUpload from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useOrigin } from "@/hooks/use-origin"
import { zodResolver } from "@hookform/resolvers/zod"
import { Color } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useTranslations } from "next-intl"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import * as z from "zod"
interface ColorFormProps {
  initialData: Color | null
}

export const ColorForm: React.FC<ColorFormProps> = ({
  initialData: initialData,
}) => {
  const t = useTranslations("Index")
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()
  const formSchema = z.object({
    name: z.string().min(1, t("StoreNameError")),
    value: z
      .string()
      .min(6, t("ColorValueError"))
      .regex(/^#/, "colore must be in hex code"),
  })

  const title = initialData ? t("EditColor") : t("Color")
  const description = initialData ? t("EditColorDesc") : t("AddNewColorDesc")
  const toastMessage = initialData ? t("ColorUpdated") : t("ColorCreated")

  const action = initialData ? t("SaveChanges") : t("Create")
  type ColorFormValues = z.infer<typeof formSchema>

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  })

  const onSubmit = async (data: ColorFormValues) => {
    console.log(data)
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(
          `/api/${params.storeid}/colors/${params.colorid}`,
          data
        )
      } else {
        await axios.post(`/api/${params.storeid}/colors`, data)
      }

      router.refresh()
      toast.success(t(toastMessage))
      router.push(`/${params.storeid}/colors`)
    } catch (error) {
      toast.error(t("SomethingWrong"))
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeid}/colors/${params.colorid}`)
      router.refresh()
      router.push("/")
      toast.success(t("StoreDeleted"))
    } catch (error) {
      toast.error(t("ColorDeleteErorr"))
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
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            className=""
            variant={"destructive"}
            size={"sm"}
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4 " />
          </Button>
        )}
      </div>
      {/* <Separator /> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-full"
        >
          <div className="grid grid-cols-3 gap-7">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Name")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t("ColorLabel")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Value")}</FormLabel>

                  <FormControl>
                    <div className="flex  items-center gap-2">
                      <Input
                        disabled={loading}
                        placeholder={t("ColorValue")}
                        {...field}
                      />

                      <div
                        className="w-7 h-7 rounded-full "
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {action}
          </Button>
        </form>
        <Separator />
      </Form>
    </>
  )
}
