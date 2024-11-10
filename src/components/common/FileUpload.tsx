import { FileUploader } from "react-drag-drop-files";
import { Button } from "../ui/button";

const FileUpload = ({
  onFileChange,
  isUploading,
}: {
  onFileChange: (file: File) => void;
  isUploading: boolean;
}) => {
  return (
    <FileUploader
      handleChange={onFileChange}
      name="file"
      types={["pdf"]}
      classes="w-full max-w-5xl"
    >
      <div className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg border-muted-foreground/25 gap-4">
        <div className="text-2xl font-semibold">Drop your PDF here</div>
        <div className="text-sm text-muted-foreground">
          or click to select a file
        </div>
        <Button id="pdf-upload" variant="outline" disabled={isUploading}>
          {isUploading ? "Uploading..." : "Select PDF"}
        </Button>
      </div>
    </FileUploader>
  );
};

export default FileUpload;

