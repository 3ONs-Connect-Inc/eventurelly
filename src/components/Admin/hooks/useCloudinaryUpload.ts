import { useState } from "react";
import { deleteImageFromCloudinary } from "../../../firebase/deleteImageFromCloudinary";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";


export const useCloudinaryUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const MAX_FILE_SIZE_MB = 12;
  const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

  const handleUpload = async (
    file: File,
    previousImageUrl?: string,
    eventId?: string
  ) => {
    if (file.size > MAX_FILE_SIZE_BYTES) {
      toast.error(`Image must be less than ${MAX_FILE_SIZE_MB}MB`);
      return null;
    }

    setUploading(true);

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const formData = new FormData();

    try {
      // Optional: compress the image before uploading
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 6, // Target size, you can adjust this
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      });

      formData.append("file", compressedFile);
      formData.append("upload_preset", uploadPreset);

      // Optional: delete previous image
      if (eventId && previousImageUrl) {
        await deleteImageFromCloudinary(previousImageUrl);
      }

      const res = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.error) {
        toast.error(`Upload failed: ${data.error.message}`);
        return null;
      }

      setImageUrl(data.secure_url);
      return data.secure_url;
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed. Please try again.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploading, imageUrl, handleUpload };
};