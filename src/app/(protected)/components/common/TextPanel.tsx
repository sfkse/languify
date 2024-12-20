"use client";
import { Button } from "@/app/(protected)/components/ui/button";
import { Highlighter, PanelRight, Wand2 } from "lucide-react";
import { cn } from "@/app/(protected)/lib/utils";
import { useRef } from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "@/app/(protected)/components/ui/tooltip";
import useHandleClickOutsidePanel from "../../hooks/useHandleClickOutsidePanel";
import useAddToGlossary from "../../hooks/glossary/useAddToGlossary";
import useRephraseText from "../../hooks/document/useRephraseText";
import useHandleClickOutsideDrawer from "../../hooks/useHandleClickOutsideDrawer";
import { toast } from "../../hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useRouter } from "next/navigation";

const TextPanel = ({
  selectedText,
  setSelectedText,
  isPanelOpen,
  setIsPanelOpen,
  documentId,
  page,
  language,
  level,
}: {
  selectedText: string;
  setSelectedText: (text: string) => void;
  isPanelOpen: boolean;
  setIsPanelOpen: (open: boolean) => void;
  documentId: string;
  page: number;
  language?: string;
  level?: string;
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  useHandleClickOutsidePanel(panelRef, setIsPanelOpen, setSelectedText);
  useHandleClickOutsideDrawer();

  const { addToGlossary, isLoading: isAddingToGlossary } = useAddToGlossary();
  const { rephrase, isRephrasing, rephrasedText } = useRephraseText();

  const isButtonDisabled = !selectedText || isRephrasing || isAddingToGlossary;
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
                // setRephrasedText("");
                setSelectedText("");
              }}
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
        ref={panelRef}
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
                  <p className="text-sm text-muted-foreground underline">
                    Rephrased Text
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {rephrasedText}
                  </p>
                </>
              )}
              <div className="flex gap-2 w-full mt-auto pb-4">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    language && level
                      ? rephrase(selectedText, language, level)
                      : toast({
                          title: "Error rephrasing text",
                          description:
                            "Please select a language and level from",
                          action: (
                            <ToastAction
                              altText="Go to settings"
                              onClick={() => router.push("/settings")}
                            >
                              Go to settings
                            </ToastAction>
                          ),
                        })
                  }
                  disabled={isButtonDisabled}
                >
                  <Wand2 />
                  {isRephrasing ? "Rephrasing..." : "Rephrase"}
                </Button>
                <Button
                  className="w-full"
                  onClick={() =>
                    addToGlossary(selectedText, rephrasedText, documentId, page)
                  }
                  disabled={isButtonDisabled}
                >
                  {isAddingToGlossary ? "Adding..." : "Add to glossary"}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted-foreground text-center h-full flex flex-col items-center justify-center">
              <Highlighter className="w-10 h-10" />
              <span className="mt-2">
                Let´s rephrase some text. Highlight some text to get started.
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default TextPanel;

