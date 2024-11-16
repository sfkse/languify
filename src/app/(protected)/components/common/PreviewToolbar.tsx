import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { RotateCw } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/(protected)/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import { Dialog } from "@/app/(protected)/components/ui/dialog";
import SettingsOptions from "./SettingsOptions";

const PreviewToolbar = ({
  pageNumber,
  numPages,
  changePage,
  scale,
  zoomIn,
  zoomOut,
  rotate,
}: {
  pageNumber: number;
  numPages: number;
  changePage: (page: number) => void;
  scale: number;
  zoomIn: () => void;
  zoomOut: () => void;
  rotate: () => void;
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {pageNumber} of {numPages}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => changePage(1)}
          disabled={pageNumber >= (numPages || 1)}
        >
          Next
        </Button>
      </div>

      <div className="flex items-center gap-1 ml-4">
        <Button
          variant="outline"
          size="icon"
          onClick={zoomOut}
          disabled={scale <= 0.5}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span className="text-sm w-20 text-center">
          {Math.round(scale * 100)}%
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={zoomIn}
          disabled={scale >= 3}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={rotate}>
          <RotateCw className="h-4 w-4" />
        </Button>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Settings className="h-4 w-full" /> Settings
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
            <DialogDescription>
              <SettingsOptions />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PreviewToolbar;

