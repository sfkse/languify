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
import { useRouter } from "next/dist/client/components/navigation";

const Popup = ({ show }: { show: boolean }) => {
  const router = useRouter();
  return (
    <Dialog open={show}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="my-4">Let´s get you started</DialogTitle>
          <DialogDescription>
            Set your language and level to get started. This will be used for
            all your documents by default.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => router.push("/settings")}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;

