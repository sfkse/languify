"use client";
import { Button } from "../ui/button";
import { Settings, RotateCw } from "lucide-react";
import { Minus, Plus } from "lucide-react";
import useFetchDocumentSettings from "../../hooks/document/useFetchDocumentSettings";
import { useState } from "react";
import Popup from "./Popup";
import SettingsOptions from "./SettingsOptions";
import { UserSettings } from "../../types/user";

const PreviewToolbar = ({
  pageNumber,
  numPages,
  changePage,
  scale,
  zoomIn,
  zoomOut,
  rotate,
  documentId,
}: {
  pageNumber: number;
  numPages: number;
  changePage: (page: number) => void;
  scale: number;
  zoomIn: () => void;
  zoomOut: () => void;
  rotate: () => void;
  documentId: string;
}) => {
  const [open, setOpen] = useState(false);
  const { settings } = useFetchDocumentSettings(documentId); // TODO: Decide usage of mutate

  const handleDialogClose = () => {
    // mutate(); // Refresh settings data when dialog closes
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

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
        <Button size="icon" onClick={() => setOpen(true)}>
          <Settings className="h-4 w-4" />
        </Button>
      </div>
      <Popup
        show={open}
        onOpenChange={handleOpenChange}
        title="Document Settings"
        description={
          <SettingsOptions
            settings={settings as UserSettings}
            type="document"
            documentId={documentId}
            onSettingsSaved={() => handleDialogClose()}
          />
        }
      />
    </div>
  );
};

export default PreviewToolbar;

