"use client";
import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import PreviewToolbar from "@/app/(protected)/components/common/PreviewToolbar";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Preview = ({
  url,
  onTextSelect,
  onPageChange,
  page,
}: {
  url: string;
  onTextSelect: (text: string) => void;
  onPageChange: (page: number) => void;
  page: number;
}) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    const newPageNumber = page + offset;
    onPageChange(Math.min(Math.max(1, newPageNumber), numPages || 1));
  };

  const rotate = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection?.toString();
    if (text && text.trim() !== "") {
      onTextSelect(text);
    }
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-muted">
        <PreviewToolbar
          pageNumber={page}
          numPages={numPages}
          changePage={changePage}
          scale={scale}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          rotate={rotate}
        />

        <div className="w-full overflow-auto relative">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex justify-center"
            onMouseUp={handleTextSelection}
          >
            <Page
              pageNumber={page}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="border rounded-lg shadow-lg"
              scale={scale}
              rotate={rotation}
            />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default Preview;

