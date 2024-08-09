"use client";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { useOrigin } from "@/hooks/use-origin";
import { useLocale } from "next-intl";
import { CheckIcon, Languages } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useEffect, useState } from "react";

export const LanguagesSwitch = () => {
  const pathname = usePathname();
  const origin = useOrigin();
  const locale = useLocale();
  const newLocale = locale == "ar" ? "en" : "ar";
  const currentLanguage = locale == "ar" ? "العربية" : "English";
  const otherLanguage = locale != "ar" ? "العربية" : "English";
  const newPath = `${origin}/${newLocale}${pathname}`;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return "";
  }
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button className="me-2" variant={"outline"}>
            <Languages className="me-2 h-4 w-4" />
            {currentLanguage}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem className="bg-accent">
            {currentLanguage}
            <CheckIcon className="ms-auto w-3 h-3 " />
          </DropdownMenuItem>
          <DropdownMenuItem
            asChild
            className=" cursor-pointer text-muted-foreground"
          >
            <Link href={newPath}>{otherLanguage}</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
