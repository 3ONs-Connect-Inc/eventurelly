import React from "react";
import { useCloudinaryUpload } from "../hooks/useCloudinaryUpload";

type Props = {
  onUploadSuccess: (url: string) => void;
  label?: string;
  eventId?: string;
  previousImageUrl?: string;
    required?: boolean; 
};

const CloudinaryUpload: React.FC<Props> = ({
  onUploadSuccess,
  label = "Upload Image",
  eventId,
  previousImageUrl,
    required = false, 
}) => {
  const { uploading, imageUrl, handleUpload } = useCloudinaryUpload();

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await handleUpload(file, previousImageUrl, eventId);
    if (url) onUploadSuccess(url);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="relative w-full max-w-xs">
        <label className="text-sm font-medium">{label}</label>
        <input
          type="file"
          accept="image/*"
          id="imageUpload"
          onChange={onChange}
          className="hidden"
        required={required}
        />
        <label
          htmlFor="imageUpload"
          className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 border border-dashed border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l3-3m-3 3l-3-3m4-6a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          <span>Upload Image</span>
        </label>
      </div>

      {uploading && <p className="text-blue-600">Uploading...</p>}
      {(imageUrl || previousImageUrl) && (
  <img
    src={imageUrl || previousImageUrl}
    alt="Event"
    className="mt-2 h-32 rounded border object-cover"
  />
)}
    </div>
  );
};

export default CloudinaryUpload;
