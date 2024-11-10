"use client";
import { useState } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Preview from "./Preview";
import Drawer from "./Drawer";
import { toast } from "@/hooks/use-toast";
import FileUpload from "./FileUpload";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export function PDFViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [url, setUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (file: File) => {
    if (file && file.type === "application/pdf") {
      setUrl(URL.createObjectURL(file));
      setPageNumber(1);
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }
      toast({
        title: "Upload successful",
        description: `File "${file.name}" has been uploaded.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages || 1);
    });
  };

  return (
    <>
      {!url && (
        <FileUpload onFileChange={handleFileChange} isUploading={isUploading} />
      )}

      {url && (
        <div className="flex flex-col w-full gap-4">
          <div className="w-full flex flex-row justify-center gap-4 max-w-5xl">
            <Preview
              url={url || ""}
              pageNumber={pageNumber}
              numPages={numPages || 0}
              changePage={changePage}
              setNumPages={setNumPages}
            />
            <Drawer />
          </div>
        </div>
      )}
    </>
  );
}

