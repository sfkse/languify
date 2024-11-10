import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const DataTable = () => {
  const trimText = (text: string) => {
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  return (
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
  );
};

export default DataTable;

