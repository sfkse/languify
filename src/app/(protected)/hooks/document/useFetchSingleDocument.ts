import { useEffect, useState } from "react";
import { getDocument } from "../../actions/documents";
import { Document } from "@prisma/client";

const useFetchSingleDocument = (id: string) => {
  const [document, setDocument] = useState<Document | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const document = await getDocument(id);
        setDocument(document as Document);
      } catch (error) {
        setError(error as Error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDocument();
  }, [id]);

  return { document, error, isLoading };
};

export default useFetchSingleDocument;
