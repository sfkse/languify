import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/app/(protected)/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/app/(protected)/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface Column {
  key: string;
  header: string;
  width?: string;
}

interface TableItem {
  [key: string]: string | number;
  id: string;
}

interface DataTableProps {
  columns: Column[];
  data: TableItem[];
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  maxTextLength?: number;
}

const DataTable = ({
  columns,
  data,
  onEdit,
  onDelete,
  maxTextLength = 100,
}: DataTableProps) => {
  const trimText = (text: string) => {
    return typeof text === "string" && text.length > maxTextLength
      ? text.substring(0, maxTextLength) + "..."
      : text;
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead
              key={column.key}
              className={column.width ? `w-${column.width}` : undefined}
            >
              {column.header}
            </TableHead>
          ))}
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id} className="hover:bg-gray-100 cursor-pointer">
            {columns.map((column) => (
              <TableCell
                key={`${item.id}-${column.key}`}
                className="font-medium"
              >
                {trimText(item[column.key] as string)}
              </TableCell>
            ))}
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreHorizontal className="w-4 h-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="-translate-x-2">
                  {onEdit && (
                    <DropdownMenuItem onClick={() => onEdit(item.id)}>
                      Edit
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem
                      onClick={() => onDelete(item.id)}
                      className="text-red-500"
                    >
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DataTable;

