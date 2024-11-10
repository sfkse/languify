"use client";

import { useState } from "react";
import { toast } from "@/app/(protected)/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createDocument } from "@/app/(protected)/actions/documents";

const useUploadFile = () => {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      // Upload to Cloudinary
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const cloudinaryData = await cloudinaryResponse.json();
      if (!cloudinaryResponse.ok) {
        throw new Error(cloudinaryData.error || "Upload failed");
      }

      // Save document to database
      const savedDocument = await createDocument(
        file.name,
        cloudinaryData.secure_url
      );

      if (!savedDocument) {
        throw new Error("Failed to save document");
      }

      toast({
        title: "Upload successful",
        description: `File "${file.name}" has been uploaded.`,
      });

      // Navigate to the document page
      router.push(`/documents/${savedDocument.id}`);
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

