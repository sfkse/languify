import Breadcrumbs from "@/app/(protected)/components/common/Breadcrumbs";
import DataTable from "@/app/(protected)/components/common/DataTable";
import PageContentWrapper from "@/app/(protected)/components/common/PageContentWrapper";
import { Input } from "@/app/(protected)/components/ui/input";

const DocumentsPage = () => {
  const columns = [
    { key: "text", header: "Text", width: "3/4" },
    { key: "page", header: "Page", width: "1/4" },
  ];

  const data = [
    { id: "1", text: "Sample text", page: 1 },
    { id: "2", text: "Another text", page: 2 },
  ];

  return (
    <>
      <Breadcrumbs />
      <PageContentWrapper>
        <div className="flex flex-row justify-start w-80">
          <Input placeholder="Search" />
        </div>
        <div className="rounded-md border mt-5 max-w-5xl">
          <DataTable
            columns={columns}
            data={data}
            onEdit={(id) => console.log("Edit", id)}
            onDelete={(id) => console.log("Delete", id)}
          />
        </div>
      </PageContentWrapper>
    </>
  );
};

export default DocumentsPage;

