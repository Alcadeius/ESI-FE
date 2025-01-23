import { useState } from "react";
import Image from 'next/image';

export default function DragAndDropInput() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col items-center h-32 my-10 w-full bg-transparent justify-center">
      <div
        className={`w-full max-w-md 2xl:max-w-full p-10 border-2 border-dashed rounded-lg transition-colors ${
          isDragging
            ? "border-blue-500 bg-transparent"
            : "border-gray-300 bg-transparent"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div>
          <p className="text-center text-gray-700 cursor-default">
            Selected File: <strong>{file.name}</strong>
          </p>
          <p className="text-center text-gray-600">
            Drag & drop your file here, or{" "}
            <label
              htmlFor="file-upload"
              className="text-blue-500 underline cursor-pointer"
              >
              browse
            </label>
          </p>
          </div>
        ) : (

        <div className="grid grid-cols-1 gap-3 items-center justify-items-center">
            <div>
        <Image src="/images/image3.png" alt="" width={100} height={100}/>
            </div>
            <div>    
          <p className="text-center text-gray-600">
            Drag & drop your file here, or{" "}
            <label
              htmlFor="file-upload"
              className="text-blue-500 underline cursor-pointer"
              >
              browse
            </label>
          </p>
            </div>
        </div>
        )}
        <input
          id="file-upload"
          type="file"
          name="application_file"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}
