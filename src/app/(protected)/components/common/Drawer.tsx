"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTrigger,
  SheetTitle,
} from "@/app/(protected)/components/ui/sheet";
import { Button } from "@/app/(protected)/components/ui/button";
import { Eye } from "lucide-react";
import DataTable from "./DataTable";

const Drawer = () => {
  const columns = [
    { key: "text", header: "Text", width: "3/4" },
    { key: "page", header: "Page", width: "1/4" },
  ];

  const data = [
    { id: "1", text: "Sample text", page: 1 },
    { id: "2", text: "Another text", page: 2 },
  ];

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
    </div>
  );
};

export default Drawer;

