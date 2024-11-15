import Preview from "./Preview";
import Drawer from "./Drawer";
import { getDocument } from "../../actions/documents";
import Error from "@/app/(protected)/documents/[id]/error";
import { redirect } from "next/navigation";

export async function PDFViewer({ id }: { id: string }) {
  const response = await getDocument(id);
  const document = await response.json();
  console.log(document);
  if (!document) {
    return <div>Document not found</div>;
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="w-full flex flex-row justify-center gap-4 max-w-5xl">
        {document.error ? (
          <Error error={document.error} reset={() => redirect(`/documents`)} />
        ) : (
          <Preview url={document?.[0].url || ""} />
        )}
        <Drawer />
      </div>
    </div>
  );
}

