"use client";
import Breadcrumbs from "@/app/(protected)/components/common/Breadcrumbs";
import DataTable from "@/app/(protected)/components/common/DataTable";
import PageContentWrapper from "@/app/(protected)/components/common/PageContentWrapper";
import { Input } from "@/app/(protected)/components/ui/input";
import { getDocuments } from "../actions/documents";
import { useEffect } from "react";
import { useState } from "react";
import { Document } from "@prisma/client";
import Loading from "../loading";
import { useRouter } from "next/navigation";

const columns = [
  { key: "title", header: "Title", width: "3/4" },
  { key: "createdAt", header: "Created At", width: "1/4" },
];

const DocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchDocuments = async () => {
      const response = await getDocuments();
      setDocuments(response);
      setIsLoading(false);
    };
    fetchDocuments();
  }, []);

  return (
    <>
      <Breadcrumbs />
      <PageContentWrapper>
        <div className="flex flex-row justify-start w-80">
          <Input placeholder="Search" />
        </div>
        {isLoading && <Loading />}
        <div className="rounded-md border mt-5 max-w-5xl">
          <DataTable
            columns={columns}
            data={documents}
            onSelect={(id) => router.push(`/documents/${id}`)}
            onEdit={(id) => console.log("Edit", id)}
            onDelete={(id) => console.log("Delete", id)}
          />
        </div>
      </PageContentWrapper>
    </>
  );
};

export default DocumentsPage;

