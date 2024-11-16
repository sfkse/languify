"use client";
import { Button } from "@/app/(protected)/components/ui/button";
import { Highlighter, PanelRight, Wand2 } from "lucide-react";
import { cn } from "@/app/(protected)/lib/utils";
import {
  createGlossary,
  rephraseText,
} from "@/app/(protected)/actions/glossary";
import { toast } from "@/app/(protected)/hooks/use-toast";
import { useState } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/app/(protected)/components/ui/tooltip";

const TextPanel = ({
  selectedText,
  setSelectedText,
  isPanelOpen,
  setIsPanelOpen,
  documentId,
  page,
}: {
  selectedText: string;
  setSelectedText: (text: string) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;
  documentId: string;
  page: number;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRephrasing, setIsRephrasing] = useState(false);
  const [rephrasedText, setRephrasedText] = useState("");

  const handleAddToGlossary = async () => {
    try {
      setIsLoading(true);
      const glossaryText = `${selectedText} - ${rephrasedText}`;
      await createGlossary(glossaryText, documentId, page);

      toast({
        variant: "default",
        title: "Added to glossary",
        description: "The text has been added to the glossary",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error adding to the glossary",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRephrase = async () => {
    try {
      setIsRephrasing(true);
      const msg = await rephraseText(selectedText);
      setRephrasedText(msg || "");
    } catch (error) {
      console.error(error);
    } finally {
      setIsRephrasing(false);
    }
  };

  return (
    <>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                setIsPanelOpen(!isPanelOpen);
                setRephrasedText("");
                setSelectedText("");
              }}
              className="z-40"
            >
              <PanelRight className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Rephrase Text</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div
        className={cn(
          "fixed -right-10 top-1/2 -translate-y-1/2 h-96 w-80 overflow-auto bg-background border-l shadow-lg transform transition-transform duration-300 ease-in-out z-30 p-6 rounded-l-lg",
          isPanelOpen ? "translate-x-0 right-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col gap-3 h-full">
          {selectedText ? (
            <>
              <h2 className="text-lg font-semibold">Rephrase Text</h2>
              <p className="text-sm text-muted-foreground underline">
                Original Text
              </p>
              <p className="text-sm text-muted-foreground">{selectedText}</p>
              {rephrasedText && (
                <>
                  <p className="text-sm text-muted-foreground">
                    Rephrased Text
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <br />
                    {rephrasedText}
                  </p>
                </>
              )}
              <div className="flex gap-2 w-full mt-auto pb-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleRephrase}
                  disabled={!selectedText || isLoading || isRephrasing}
                >
                  <Wand2 />
                  {isRephrasing ? "Rephrasing..." : "Rephrase"}
                </Button>
                <Button
                  className="w-full"
                  onClick={handleAddToGlossary}
                  disabled={!selectedText || isLoading}
                >
                  {isLoading ? "Adding..." : "Add to glossary"}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center h-full flex flex-col items-center justify-center">
              <Highlighter className="w-10 h-10" />
              <span className="mt-2">
                Let's rephrase some text. Highlight some text to get started.
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TextPanel;

