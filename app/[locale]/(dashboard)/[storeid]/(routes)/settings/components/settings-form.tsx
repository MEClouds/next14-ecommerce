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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as z from "zod";
interface SettingsFormProps {
  initialData: Store;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
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
  });

  type SettingFormValues = z.infer<typeof formSchema>;

  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingFormValues) => {
    console.log(data);
    try {
      setLoading(true);

      await axios.patch(`/api/store/${params.storeid}`, data);

      router.refresh();
      toast.success(t("StoreUpdated"));
    } catch (error) {
      toast.error(t("SomethingWrong"));
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/store/${params.storeid}`);
      router.refresh();
      router.push("/");
      toast.success(t("StoreDeleted"));
    } catch (error) {
      toast.error(t("StoreDeleteErorr"));
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
        <Heading title={t("settings")} description={t("SettingsDesriptions")} />
        <Button
          disabled={loading}
          className=""
          variant={"destructive"}
          size={"sm"}
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4 " />
        </Button>
      </div>
      {/* <Separator /> */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-7 w-full"
        >
          <div className="grid grid-cols-3 gap7">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("Name")}</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder={t("StoreName")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            {t("SaveChanges")}
          </Button>
        </form>
        <Separator />
        <ApiALert
          title="NEXT_PUBLIC_API_URL"
          description={`${origin}/api/${params.storeid}`}
          variant="public"
        />
      </Form>
    </>
  );
};
