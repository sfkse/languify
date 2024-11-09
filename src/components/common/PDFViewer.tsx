"use client";
import { ChangeEvent, useState } from "react";
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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [url, setUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setUrl(URL.createObjectURL(file));
      setPageNumber(1);
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      //   const response = await fetch("/api/upload", {
      //     method: "POST",
      //     body: formData,
      //   });
      //   const data = await response.json();
      //   if (!response.ok) {
      //     throw new Error(data.error || "Upload failed");
      //   }
      //   toast({
      //     title: "Upload successful",
      //     description: `File "${file.name}" has been uploaded.`,
      //   });
    } catch (error) {
      //   toast({
      //     title: "Upload failed",
      //     description: error instanceof Error ? error.message : "Something went wrong",
      //     variant: "destructive",
      //   });
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

  const handleChange = (file: File) => {
    setSelectedFile(file);
    setUrl(URL.createObjectURL(file));
  };

  return (
    <>
      {/* {!url && <FileUpload handleChange={handleChange} />} */}

      {/* {url && ( */}
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
      {/* )} */}
    </>
  );
}

