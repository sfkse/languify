import Breadcrumbs from "@/app/(protected)/components/common/Breadcrumbs";
import { PDFViewer } from "@/app/(protected)/components/common/PDFViewer";

const DocumentPage = () => {
  return (
    <>
      <Breadcrumbs />
      <div className="flex flex-row justify-center w-full gap-4 relative">
        <PDFViewer />
      </div>
    </>
  );
};

export default DocumentPage;

