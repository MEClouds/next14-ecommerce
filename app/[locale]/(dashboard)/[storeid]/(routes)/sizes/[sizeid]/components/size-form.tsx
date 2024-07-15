"use client";

import { AlertModal } from "@/components/modals/alert-modal";
import { ApiALert } from "@/components/ui/api-alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Size } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
interface SizeFormProps {
  initialData: Size | null;
}

export const SizeForm: React.FC<SizeFormProps> = ({
  initialData: initialData,
}) => {
  const t = useTranslations("Index");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();
  const formSchema = z.object({
    name: z.string().min(1, t("StoreNameError")),
    value: z.string().min(1, t("StoreNameError")),
  });

  const title = initialData ? t("EditSize") : t("Size");
  const description = initialData ? t("EditSizeDesc") : t("AddNewSizeDesc");
  const toastMessage = initialData ? t("SizeUpdated") : t("SizeCreated");

  const action = initialData ? t("SaveChanges") : t("Create");
  type SizeFormValues = z.infer<typeof formSchema>;

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      value: "",
    },
  });

  const onSubmit = async (data: SizeFormValues) => {
    console.log(data);
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeid}/sizes/${params.sizeid}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeid}/sizes`, data);
      }

      router.refresh();
      toast.success(t(toastMessage));
      router.push(`/${params.storeid}/sizes`);
    } catch (error) {
      toast.error(t("SomethingWrong"));
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeid}/sizes/${params.sizeid}`);
      router.refresh();
      router.push("/");
      toast.success(t("StoreDeleted"));
    } catch (error) {
      toast.error(t("SizeDeleteErorr"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
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
                      placeholder={t("SizeLabel")}
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
                    <Input
                      disabled={loading}
                      placeholder={t("SizeValue")}
                      {...field}
                    />
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
  );
};
