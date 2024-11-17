"use client";
import Preview from "@/app/(protected)/components/common/Preview";
import Drawer from "@/app/(protected)/components/common/Drawer";
import TextPanel from "@/app/(protected)/components/common/TextPanel";
import Error from "@/app/(protected)/(pages)/documents/[id]/error";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useFetchSingleDocument from "@/app/(protected)/hooks/document/useFetchSingleDocument";
import useFetchDocumentSettings from "../../hooks/document/useFetchDocumentSettings";

export function PDFViewer({ id }: { id: string }) {
  const [selectedText, setSelectedText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const {
    document,
    error: documentError,
    isLoading: documentIsLoading,
  } = useFetchSingleDocument(id);

  const {
    settings,
    error: documentSettingsError,
    isLoading: documentSettingsIsLoading,
  } = useFetchDocumentSettings(id);

  const isLoading = documentIsLoading || documentSettingsIsLoading;
  const error = documentError || documentSettingsError;

  const handleTextSelection = (text: string) => {
    setSelectedText(text);
    setIsPanelOpen(true);
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <Error error={error} reset={() => router.push("/documents")} />;
  if (!document) return <div>Document not found</div>;

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="w-full flex flex-row justify-center gap-4 max-w-5xl">
        <Preview
          url={document.url}
          onTextSelect={handleTextSelection}
          onPageChange={handlePageChange}
          page={page}
        />
        <div className="fixed right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-40">
          <Drawer
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            documentId={document.id}
          />
          <TextPanel
            selectedText={selectedText}
            setSelectedText={setSelectedText}
            documentId={document.id}
            page={page}
            setIsPanelOpen={setIsPanelOpen}
            isPanelOpen={isPanelOpen}
            settings={settings}
          />
        </div>
      </div>
    </div>
  );
}

