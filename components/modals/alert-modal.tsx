"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const t = useTranslations("Index");
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <Modal
      title={t("AreYouShure")}
      description={t("CannotBeUndone")}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-5 flex gap-2 items-center justify-end w-full">
        <Button disabled={loading} variant={"outline"} onClick={onClose}>
          {t("cancel")}
        </Button>
        <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
          {t("continue")}
        </Button>
      </div>
    </Modal>
  );
};
