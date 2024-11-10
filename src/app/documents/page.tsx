import Breadcrumbs from "@/components/common/Breadcrumbs";
import DataTable from "@/components/common/DataTable";
import PageContentWrapper from "@/components/common/PageContentWrapper";
import { Input } from "@/components/ui/input";

const DocumentsPage = () => {
  return (
    <>
      <Breadcrumbs />
      <PageContentWrapper>
        <div className="flex flex-row justify-start w-80">
          <Input placeholder="Search" />
        </div>
        <div className="rounded-md border mt-5 max-w-5xl">
          <DataTable />
        </div>
      </PageContentWrapper>
    </>
  );
};

export default DocumentsPage;

