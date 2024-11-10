import { useState } from "react";
import { Document, Page } from "react-pdf";
import PreviewToolbar from "@/components/common/PreviewToolbar";

const Preview = ({ url }: { url: string }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(0);

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

        <div className="w-full overflow-auto">
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex justify-center"
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
        </div>
      </div>
    </div>
  );
};

export default Preview;

