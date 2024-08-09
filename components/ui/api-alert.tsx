"use client";
import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";

interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "public",
  admin: "admin",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

export const ApiALert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const t = useTranslations();
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success(t("Index.Copy"));
  };
  return (
    <Alert dir="ltr">
      <Server className="h-4 w-4" />
      <AlertTitle className="flex text-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-2 flex items-center justify-between ">
        <code className=" relative rounded bg-muted px-[0.3rem] font-mono text-sm font-semibold ">
          {description}
        </code>
        <Button variant={"outline"} size={"icon"} onClick={onCopy}>
          <Copy className="h-3 w-3" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
