import { useParams } from "next/navigation";
import { ApiALert } from "./api-alert";
import { Heading } from "./heading";
import { Separator } from "./separator";
import { useOrigin } from "@/hooks/use-origin";

interface ApiListProps {
  entityName: string;
  entityId: string;
}

export const ApiList = ({ entityName, entityId }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.storeid}`;
  return (
    <>
      <ApiALert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiALert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityId}}`}
      />
      <ApiALert
        title="POST"
        variant="admin"
        description={`${baseUrl}/${entityName}`}
      />
      <ApiALert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityId}}`}
      />
    </>
  );
};
