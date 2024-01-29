"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "../ui/modal";
import { useTranslations } from "next-intl";

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const t = useTranslations("Index");
  return (
    <Modal
      title={t("CreateStore")}
      description={t("AddNewStore")}
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      Create Store Form {t("title")}
    </Modal>
  );
};
