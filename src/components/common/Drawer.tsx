import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import DataTable from "./DataTable";

const Drawer = () => {
  return (
    <div className="sticky top-16 right-0">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Eye className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>PDF Title</SheetTitle>
            <SheetDescription>
              <DataTable />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Drawer;

