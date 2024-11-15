import Breadcrumbs from "@/app/(protected)/components/common/Breadcrumbs";
import { PDFViewer } from "@/app/(protected)/components/common/PDFViewer";

const DocumentPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <>
      <Breadcrumbs />
      <div className="flex flex-row justify-center w-full gap-4 relative">
        <PDFViewer id={id} />
      </div>
    </>
  );
};

export default DocumentPage;

