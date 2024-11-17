import { useEffect, useState } from "react";
import { DocumentSettings } from "@/app/(protected)/types/documents";
import { getDocumentSettings } from "@/app/(protected)/actions/documents";

const useFetchDocumentSettings = (id: string) => {
  const [settings, setSettings] = useState<DocumentSettings | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settings = await getDocumentSettings(id);
        setSettings(settings);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, [id]);

  return { settings, error, isLoading };
};

export default useFetchDocumentSettings;

