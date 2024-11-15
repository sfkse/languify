"use client";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import PreviewToolbar from "@/app/(protected)/components/common/PreviewToolbar";
import CustomPopover from "@/app/(protected)/components/common/CustomPopover";
import { Button } from "../ui/button";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Preview = ({ url }: { url: string }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [selectedText, setSelectedText] = useState("");
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const [popupVisible, setPopupVisible] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages || 1);
    });
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

  const handleTextSelection = (e: React.MouseEvent<HTMLDivElement>) => {
    const selection = window.getSelection();
    const text = selection?.toString();
    console.log(text);
    if (text) {
      const { clientX, clientY } = e;
      setSelectedText(text);
      setPopupPosition({ x: clientX, y: clientY });
      setPopupVisible(true);
    } else {
      setPopupVisible(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = () => {
      setPopupVisible(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddToGlossary = () => {
    console.log("Add to glossary");
    setPopupVisible(false);
  };

  return (
    <div className="w-full max-w-5xl">
      <div className="flex flex-col items-center gap-4 p-4 rounded-lg bg-muted">
        <PreviewToolbar
          pageNumber={pageNumber}
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
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="border rounded-lg shadow-lg"
              scale={scale}
              rotate={rotation}
            />
          </Document>

          {popupVisible && (
            <CustomPopover
              isVisible={popupVisible}
              x={popupPosition.x}
              y={popupPosition.y}
            >
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium">Selected text:</p>
                <p className="text-sm text-muted-foreground">{selectedText}</p>
                <Button onClick={handleAddToGlossary}>Add to glossary</Button>
              </div>
            </CustomPopover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;

