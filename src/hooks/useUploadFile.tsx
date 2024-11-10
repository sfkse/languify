"use client";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const useUploadFile = () => {
  const [isUploading, setIsUploading] = useState(false);

  //   const handleFileChange = async (file: File) => {
  //     if (file && file.type === "application/pdf") {
  //       setUrl(URL.createObjectURL(file));
  //       setPageNumber(1);
  //       await uploadFile(file);
  //     }
  //   };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.error || "Upload failed");
      }
      toast({
        title: "Upload successful",
        description: `File "${file.name}" has been uploaded.`,
      });
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  return {
    isUploading,
    uploadFile,
  };
};

export default useUploadFile;

