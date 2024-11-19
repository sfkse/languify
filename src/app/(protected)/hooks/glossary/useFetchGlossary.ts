import { useCallback, useEffect, useState } from "react";
import { getDocumentGlossaries } from "@/app/(protected)/actions/glossary";
import { toast } from "@/app/(protected)/hooks/use-toast";
import { Glossary } from "@prisma/client";

const useFetchGlossary = (isDrawerOpen: boolean, documentId: string) => {
  const [data, setData] = useState<Glossary[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getGlossaries = useCallback(async () => {
    try {
      if (isDrawerOpen) {
        setIsLoading(true);
        const glossaries = await getDocumentGlossaries(documentId);
        setData(glossaries);
      }
    } catch (error) {
      console.error("Error getting glossaries", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error getting the glossaries",
      });
    } finally {
      setIsLoading(false);
    }
  }, [isDrawerOpen, documentId]);

  useEffect(() => {
    getGlossaries();
  }, [isDrawerOpen, documentId, getGlossaries]);

  return { data, isLoading };
};

export default useFetchGlossary;
