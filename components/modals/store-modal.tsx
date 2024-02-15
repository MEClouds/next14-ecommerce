"use client";
import * as z from "zod";
import axios from "axios";
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
import { useState } from "react";
import toast from "react-hot-toast";
import { Separator } from "../ui/separator";

export const StoreModal = () => {
  const t = useTranslations("Index");
  const formSchema = z.object({
    name: z.string().min(1, t("StoreNameError")),
  });
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    //TODO : Create Store
    // console.log(values);

    try {
      setLoading(true);
      const response = await axios.post("/api/store", values);
      window.location.assign(`/${response.data.id}`);
      //window.location assign this make refresh the page to ensure db ready
      // toast.success(t("StoreCreated"));
    } catch (error) {
      toast.error(t("SomethingWrong"));
    } finally {
      setLoading(false);
    }
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
                    <Input
                      disabled={loading}
                      placeholder={t("E-commerce")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* TODO : Add field to select Store language */}
            <div className="pt-5 gap-2 flex items-center justify-end w-full">
              <Button
                disabled={loading}
                variant={"outline"}
                onClick={storeModal.onClose}
              >
                {t("cancel")}
              </Button>
              <Button disabled={loading} type="submit">
                {t("continue")}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Separator />
    </Modal>
  );
};
