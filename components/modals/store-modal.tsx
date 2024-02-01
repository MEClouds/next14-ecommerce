"use client";
import * as z from "zod";
import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "../ui/modal";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const StoreModal = () => {
  const t = useTranslations("Index");
  const formSchema = z.object({
    name: z.string().min(1, t("StoreNameError")),
  });
  const storeModal = useStoreModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //TODO : Create Store
    console.log(values);
  };
  return (
    <Modal
      title={t("CreateStore")}
      description={t("AddNewStore")}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-3 py-2 pb-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> {t("StoreName")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("E-commerce")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-5 gap-2 flex items-center justify-end w-full">
              <Button variant={"outline"} onClick={storeModal.onClose}>
                {t("cancel")}
              </Button>
              <Button type="submit">{t("continue")}</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
