import { useState } from "react";
import { createGlossary } from "../../actions/glossary";
import { toast } from "../use-toast";

const useAddToGlossary = () => {
  const [isLoading, setIsLoading] = useState(false);

  const addToGlossary = async (
    selectedText: string,
    rephrasedText: string,
    documentId: string,
    page: number
  ) => {
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

  return { addToGlossary, isLoading };
};

export default useAddToGlossary;

