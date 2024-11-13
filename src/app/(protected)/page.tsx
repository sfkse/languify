"use client";
import FileUpload from "@/app/(protected)/components/common/FileUpload";
import PageContentWrapper from "@/app/(protected)/components/common/PageContentWrapper";
import useUploadFile from "@/app/(protected)/hooks/useUploadFile";

export default function Home() {
  const { isUploading, uploadFile } = useUploadFile();

  const handleFileChange = (file: File) => {
    uploadFile(file);
  };

  return (
    <PageContentWrapper>
      {isUploading && <div>Uploading...</div>}
      <FileUpload onFileChange={handleFileChange} isUploading={isUploading} />
    </PageContentWrapper>
  );
}

