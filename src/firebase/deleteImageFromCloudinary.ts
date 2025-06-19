import axios from "axios";
import CryptoJS from "crypto-js";



export const deleteImageFromCloudinary = async (imageUrl: string) => {
    const publicId = imageUrl.split("/").pop()?.split(".")[0]; // Extract the public ID from the URL
  
    // Prepare a timestamp for the API request
    const timestamp = Math.floor(new Date().getTime() / 1000);
  
    // Generate a signature using the required parameters
    
    const signature = CryptoJS.SHA1(
      `public_id=${publicId}&timestamp=${timestamp}${import.meta.env.VITE_CLOUDINARY_API_SECRET}`
    ).toString(CryptoJS.enc.Hex);
  
    // Prepare the form data
    const formData = new FormData();
    formData.append('public_id', publicId!);
    formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', signature);
  
    // Make the delete request to the correct Cloudinary URL
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/destroy`,
      formData
    );
  
    return response.data.result;
  };


