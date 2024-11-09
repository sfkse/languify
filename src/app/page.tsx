import Drawer from "@/components/common/Drawer";
import { PDFViewer } from "@/components/common/PDFViewer";

export default function Home() {
  return (
    <div className="flex flex-row items-start justify-center w-full gap-4 relative">
      <PDFViewer />
      <Drawer />
    </div>
  );
}

