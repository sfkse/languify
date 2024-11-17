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
import DataTable from "./DataTable";
import { useEffect, useState } from "react";
import { toast } from "../../hooks/use-toast";
import { getDocumentGlossaries } from "../../actions/glossary";
import { Glossary } from "@prisma/client";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/app/(protected)/components/ui/tooltip";

const Drawer = ({
  isDrawerOpen,
  setIsDrawerOpen,
  documentId,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  documentId: string;
}) => {
  const [data, setData] = useState<Glossary[]>([]);

  useEffect(() => {
    if (isDrawerOpen) {
      const getGlossaries = async () => {
        try {
          const glossaries = await getDocumentGlossaries(documentId);
          setData(glossaries);
        } catch (error) {
          console.error("Error getting glossaries", error);
          toast({
            variant: "destructive",
            title: "Error",
            description: "There was an error getting the glossaries",
          });
        }
      };
      getGlossaries();
    }
  }, [isDrawerOpen, documentId]);

  const columns = [
    { key: "text", header: "Text", width: "3/4" },
    { key: "page", header: "Page", width: "1/4" },
    { key: "createdAt", header: "Added", width: "1/4" },
    { key: "actions", header: "Actions", width: "1/4" },
  ];

  return (
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
              onClick={() => console.log("Download")}
            >
              <Download className="w-4 h-4" />
            </Button>
          </SheetTitle>
          <SheetDescription>
            <DataTable
              columns={columns}
              data={data}
              onEdit={(id) => console.log("Edit", id)}
              onDelete={(id) => console.log("Delete", id)}
              maxTextLength={300}
            />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;

