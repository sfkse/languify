"use client";

import { useState } from "react";
import { toast } from "@/app/(protected)/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createDocument } from "@/app/(protected)/actions/documents";
import { uploadCloudinary } from "@/app/(protected)/actions/cloudinary";

const useUploadFile = () => {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const uploadFile = async (file: File) => {
    if (file.size > 10000000) {
      toast({
        title: "File too large",
        description: "Maximum file size is 10MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      // Upload to Cloudinary
      const cloudinaryData = await uploadCloudinary(formData);

      // Save document to database
      const savedDocument = await createDocument(
        file.name,
        cloudinaryData.secure_url
      );

      toast({
        title: "Upload successful",
        description: `File "${file.name}" has been uploaded.`,
      });

      // Navigate to the document page
      router.push(`/documents/${savedDocument.id}`);
    } catch (error) {
      console.log("upload error", error);
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

