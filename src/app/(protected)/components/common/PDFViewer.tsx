import Preview from "./Preview";
import Drawer from "./Drawer";
import { getDocument } from "../../actions/documents";

export async function PDFViewer({ id }: { id: string }) {
  const document = await getDocument(id);
  console.log(document);

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="w-full flex flex-row justify-center gap-4 max-w-5xl">
        <Preview url={document?.[0].url || ""} />
        <Drawer />
      </div>
    </div>
  );
}

