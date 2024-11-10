"use client";

import FileUpload from "@/components/common/FileUpload";
import PageContentWrapper from "@/components/common/PageContentWrapper";
import useUploadFile from "@/hooks/useUploadFile";

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

