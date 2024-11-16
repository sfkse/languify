"use client";
import Preview from "./Preview";
import Drawer from "./Drawer";
import TextPanel from "./TextPanel";
import { getDocument } from "../../actions/documents";
import Error from "@/app/(protected)/documents/[id]/error";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Document } from "@prisma/client";

export function PDFViewer({ id }: { id: string }) {
  const [selectedText, setSelectedText] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [document, setDocument] = useState<Document | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const handleTextSelection = (text: string) => {
    setSelectedText(text);
    setIsPanelOpen(true);
  };

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const document: Document = await getDocument(id);
        setDocument(document);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocument();
  }, [id]);

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
            documentId={document.id}
            page={page}
            setIsPanelOpen={setIsPanelOpen}
            isPanelOpen={isPanelOpen}
          />
        </div>
      </div>
    </div>
  );
}

