"use client";

import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";

const Topbar = () => {
  const router = useRouter();

  const handleUploadClick = () => {
    router.push("/");
    // const fileInput = document.getElementById("pdf-upload");
    // if (fileInput) {
    //   fileInput.click();
    // }
  };

  return (
    <div className="w-full flex flex-row items-center justify-end px-10 h-12">
      <Button variant="default" onClick={handleUploadClick}>
        <Upload className="w-4 h-4" />
        Upload
      </Button>
    </div>
  );
};

export default Topbar;

