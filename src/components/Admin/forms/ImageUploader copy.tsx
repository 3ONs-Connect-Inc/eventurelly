
import React, { useState } from "react";
import { uploadImageToImageKit } from "../../../utils/imagekit";


interface ImageUploaderProps {
  onUpload: (url: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setLoading(true);
    const uploadedUrl = await uploadImageToImageKit(file);
    setLoading(false);

    if (uploadedUrl) {
      onUpload(uploadedUrl);
    }
  };

  return (
    <div className="flex flex-col items-start space-y-2">
      <label className="font-medium text-sm">Add image</label>
      <div className="relative w-full max-w-xs">
  <input
    type="file"
    accept="image/*"
    id="imageUpload"
    onChange={handleImageChange}
    className="hidden"
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
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v6m0 0l3-3m-3 3l-3-3m4-6a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
    <span>Upload Image</span>
  </label>
</div>

      {loading && <p className="text-sm text-blue-600">Uploading...</p>}
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-full max-w-sm mt-2 rounded shadow"
        />
      )}
    </div>
  );
};

export default ImageUploader;
