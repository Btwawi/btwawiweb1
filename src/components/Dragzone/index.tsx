import { useCallback, useState } from "react";
import { useDropzone, Accept } from "react-dropzone";

interface FileDropzoneProps {
  onFileAccepted: (file: File) => void;
  accept?: Accept;
  maxSize?: number;
  // Make initialPreview optional
  initialPreview?: string | null;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  onFileAccepted,
  accept = { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
  maxSize = 5 * 1024 * 1024, // 5MB
  initialPreview = null, // Default to null
}) => {
  const [preview, setPreview] = useState<string | null>(initialPreview);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        onFileAccepted(file);

        // Create preview only if file is an image
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = () => {
            setPreview(reader.result as string);
          };
          reader.readAsDataURL(file);
        } else {
          setPreview(null);
        }
      }
    },
    [onFileAccepted]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept,
      maxSize,
      multiple: false,
    });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-5 text-center cursor-pointer transition ${
        isDragActive ? "border-blue-500 bg-blue-50" : "border-slate-300"
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="flex flex-col items-center">
          <img
            src={preview}
            alt="Preview"
            className="max-h-40 max-w-full mb-2 rounded"
          />
          <p className="text-sm text-slate-600">
            {isDragActive ? "Drop to replace" : "Click or drag to replace"}
          </p>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-600">
            {isDragActive
              ? "Drop the file here..."
              : "Drag & drop a file here, or click to select"}
          </p>
          {fileRejections.length > 0 && (
            <p className="text-red-500 text-sm mt-2">
              File is too large or not supported.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default FileDropzone;
