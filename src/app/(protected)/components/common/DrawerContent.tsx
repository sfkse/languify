import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Eye } from "lucide-react";
import DataTable from "./DataTable";

interface Column {
  key: string;
  header: string;
  width?: string;
}

interface TableItem {
  [key: string]: string | number | Date;
  id: string;
}

const DrawerContent = ({
  isDrawerOpen,
  setIsDrawerOpen,
  columns,
  data,
}: {
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  columns: Column[];
  data: TableItem[];
}) => {
  return (
    <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Eye className="w-4 h-4" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Selected Text</SheetTitle>
          <SheetDescription>
            <DataTable
              columns={columns}
              data={data}
              onEdit={(id) => console.log("Edit", id)}
              onDelete={(id) => console.log("Delete", id)}
            />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerContent;

