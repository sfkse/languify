import { useState } from "react";
import { rephraseText } from "../../actions/glossary";
import { toast } from "../use-toast";

const useRephraseText = () => {
  const [isRephrasing, setIsRephrasing] = useState(false);
  const [rephrasedText, setRephrasedText] = useState("");

  const rephrase = async (
    selectedText: string,
    language: string,
    level: string
  ) => {
    try {
      setIsRephrasing(true);
      const msg = await rephraseText(selectedText, level, language);
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

