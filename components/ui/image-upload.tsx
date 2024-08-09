"use client";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface imageUploadProps {
  disable?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload = ({
  disable,
  onChange,
  onRemove,
  value,
}: imageUploadProps) => {
  const [isMounted, setIsMount] = useState(false);
  const t = useTranslations("Index");
  useEffect(() => {
    setIsMount(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((url) => (
          <div key={url} className=" relative w-[200px] h-[200px] rounded-md ">
            <div className=" absolute z-10 top-2  end-2">
              <Button
                onClick={() => onRemove(url)}
                variant={"destructive"}
                size={"icon"}
              >
                <Trash className="w-4 h-4 " />
              </Button>
            </div>
            <Image src={url} fill className=" object-cover" alt="Image" />
          </div>
        ))}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset="ghaocagh">
        {({ open }) => {
          const onclick = () => {
            open();
          };
          return (
            <Button
              variant={"secondary"}
              type="button"
              disabled={disable}
              onClick={onclick}
            >
              <ImagePlus className=" me-2 w-4 h-4" />
              {t("AddImage")}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
