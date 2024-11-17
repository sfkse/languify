import { useState } from "react";
import { rephraseText } from "../../actions/glossary";
import { DocumentSettings } from "../../types/documents";
import { toast } from "../use-toast";

const useRephraseText = () => {
  const [isRephrasing, setIsRephrasing] = useState(false);
  const [rephrasedText, setRephrasedText] = useState("");

  const rephrase = async (selectedText: string, settings: DocumentSettings) => {
    console.log("settings", settings);
    try {
      setIsRephrasing(true);
      const msg = await rephraseText(
        selectedText,
        settings.level,
        settings.language.sourceLanguage
      );
      setRephrasedText(msg || "");
    } catch (error) {
      console.error(error);
      toast({
        title: "Error rephrasing text",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsRephrasing(false);
    }
  };

  return { rephrase, isRephrasing, rephrasedText };
};

export default useRephraseText;

