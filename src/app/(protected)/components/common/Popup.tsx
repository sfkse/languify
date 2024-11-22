"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/app/(protected)/components/ui/dialog";
import { Button } from "../ui/button";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

type PopupProps = {
  show: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description: ReactNode;
  buttonText?: string;
  path?: string;
};

const Popup = ({
  show,
  onOpenChange,
  title,
  description,
  buttonText,
  path,
}: PopupProps) => {
  return (
    <Dialog open={show} onOpenChange={(open) => onOpenChange?.(open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">{title}</DialogTitle>
          <DialogDescription asChild>{description}</DialogDescription>
        </DialogHeader>
        {buttonText && (
          <DialogFooter>
            <Button variant="outline" onClick={() => redirect(path || "")}>
              {buttonText}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Popup;

