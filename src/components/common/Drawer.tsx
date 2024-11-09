import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetDescription,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import LevelSlider from "@/components/common/LevelSlider";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Drawer = () => {
  const trimText = (text: string) => {
    const TRIM_LENGTH = 50;
    return text.length > TRIM_LENGTH
      ? text.substring(0, TRIM_LENGTH) + "..."
      : text;
  };

  return (
    <div className="sticky top-16 right-0">
      <Sheet>
        <SheetTrigger>
          <Button variant="outline" size="icon">
            <Eye className="w-4 h-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[700px]">
          <SheetHeader>
            <SheetTitle>PDF Title</SheetTitle>
            <SheetDescription>
              <div className="flex flex-col gap-4 mt-4">
                <div className="w-full flex flex-row items-center justify-between gap-2 mb-8">
                  <LevelSlider />
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-3/4">Text</TableHead>
                      <TableHead className="w-1/4">Page</TableHead>
                      <TableHead className="text-right"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="hover:bg-gray-100 cursor-pointer">
                      <TableCell className="font-medium">
                        {trimText(
                          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
                        )}
                      </TableCell>
                      <TableCell>1</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreHorizontal className="w-4 h-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="-translate-x-2">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Drawer;

