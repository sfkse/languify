import { useCallback, useEffect, useState } from "react";
import { IDocumentSettings } from "@/app/(protected)/types/documents";
import { getDocumentSettings } from "@/app/(protected)/actions/documents";
import { logger } from "../../lib/logging/logger";
const useFetchDocumentSettings = (documentId: string) => {
  const [settings, setSettings] = useState<IDocumentSettings | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSettings = useCallback(async () => {
    try {
      const settings = await getDocumentSettings(documentId);
      setSettings(settings);
    } catch (error) {
      logger.error("Error fetching document settings", { error });
      setError(error as Error);
    } finally {
      setIsLoading(false);
      // window.location.reload();
    }
  }, [documentId]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return { settings, error, isLoading, mutate: fetchSettings };
};

export default useFetchDocumentSettings;

