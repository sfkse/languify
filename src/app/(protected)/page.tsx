"use client";
import FileUpload from "@/app/(protected)/components/common/FileUpload";
import PageContentWrapper from "@/app/(protected)/components/common/PageContentWrapper";
import useUploadFile from "@/app/(protected)/hooks/document/useUploadFile";
import Loading from "@/app/(protected)/loading";

export default function Home() {
  const { isUploading, uploadFile } = useUploadFile();

  const handleFileChange = (file: File) => {
    uploadFile(file);
  };

  return (
    <PageContentWrapper>
      {isUploading && <Loading />}
      <FileUpload onFileChange={handleFileChange} isUploading={isUploading} />
    </PageContentWrapper>
  );
}

