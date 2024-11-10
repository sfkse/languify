"use client";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Preview from "./Preview";
import Drawer from "./Drawer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export function PDFViewer() {
  return (
    <div className="flex flex-col w-full gap-4">
      <div className="w-full flex flex-row justify-center gap-4 max-w-5xl">
        <Preview
          url={
            "https://res.cloudinary.com/dtjur0aru/image/upload/v1731239887/Cheat-Sheet-Networks-Requests_tby06r.pdf"
          }
        />
        <Drawer />
      </div>
    </div>
  );
}

