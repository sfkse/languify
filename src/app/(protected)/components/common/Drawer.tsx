"use client";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTrigger,
  SheetTitle,
} from "@/app/(protected)/components/ui/sheet";
import { Button } from "@/app/(protected)/components/ui/button";
import { Download, Eye } from "lucide-react";
import DataTable from "@/app/(protected)/components/common/DataTable";
import { useState } from "react";
import { Glossary } from "@prisma/client";
import Loading from "@/app/(protected)/loading";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/app/(protected)/components/ui/tooltip";
import Popup from "./Popup";
import { downloadGlossary } from "../../lib/gloassary";
import useFetchGlossary from "../../hooks/glossary/useFetchGlossary";

const columns = [
  { key: "text", header: "Text", width: "3/4" },
  { key: "page", header: "Page", width: "1/4" },
  { key: "createdAt", header: "Added", width: "1/4" },
  { key: "actions", header: "Actions", width: "1/4" },
];

const Drawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  documentId,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  documentId: string;
}) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedGlossary, setSelectedGlossary] = useState<Glossary | null>(
    null
  );

  const { data, isLoading } = useFetchGlossary(isDrawerOpen, documentId);

  const handleSelect = (id: string) => {
    const glossary = data.find((glossary) => glossary.id === id);
    if (glossary) {
      setSelectedGlossary(glossary);
      setPopupOpen(true);
    }
  };

  const getGlossaryDescription = (glossary: Glossary | null) => {
    if (!glossary) return <></>;
    return (
      <div className="flex justify-between items-center">
        <p className="flex-1">{glossary.text}</p>
        <Button
          variant="outline"
          size="icon"
          className="ml-4"
          onClick={() => handleDownloadGlossary(glossary)}
        >
          <Download className="w-4 h-4" />
        </Button>
      </div>
    );
  };

  const handleDownloadGlossary = (glossary: Glossary) => {
    downloadGlossary(glossary.text, `${glossary.text.slice(0, 10)}...`);
  };

  const handleDownloadAllGlossaries = () => {
    const blobContent = data.map((glossary) => glossary.text).join("\n");
    downloadGlossary(blobContent, "glossary");
  };

  return (
    <>
      <Popup
        show={popupOpen}
        onOpenChange={(popupOpen: boolean) => setPopupOpen(popupOpen)}
        title="Glossary"
        description={getGlossaryDescription(selectedGlossary)}
      />
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Eye className="w-4 h-4" />
                </Button>
              </SheetTrigger>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>View glossary</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle className="flex justify-between items-center pr-8">
              Glossary
              <Button
                variant="outline"
                size="icon"
                title="Download glossary"
                onClick={handleDownloadAllGlossaries}
              >
                <Download className="w-4 h-4" />
              </Button>
            </SheetTitle>
            <SheetDescription asChild>
              {isLoading ? (
                <Loading />
              ) : (
                <DataTable
                  columns={columns}
                  data={data}
                  onEdit={(id) => console.log("Edit", id)}
                  onDelete={(id) => console.log("Delete", id)}
                  maxTextLength={300}
                  onSelect={handleSelect}
                />
              )}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Drawer;

