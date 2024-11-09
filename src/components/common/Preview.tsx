import { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus, RotateCw } from "lucide-react";
import { Document, Page } from "react-pdf";

const Preview = ({
  url,
  pageNumber,
  numPages,
  changePage,
  setNumPages,
}: {
  url: string;
  pageNumber: number;
  numPages: number;
  changePage: (page: number) => void;
  setNumPages: (numPages: number) => void;
}) => {
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
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
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => changePage(-1)}
              disabled={pageNumber <= 1}
            >
              Previous
            </Button>
            <span className="text-sm">
              Page {pageNumber} of {numPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => changePage(1)}
              disabled={pageNumber >= (numPages || 1)}
            >
              Next
            </Button>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <Button
              variant="outline"
              size="icon"
              onClick={zoomOut}
              disabled={scale <= 0.5}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-sm w-20 text-center">
              {Math.round(scale * 100)}%
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={zoomIn}
              disabled={scale >= 3}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={rotate}>
              <RotateCw className="h-4 w-4" />
            </Button>
          </div>
        </div>

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

