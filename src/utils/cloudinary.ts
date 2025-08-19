import axios from "axios";

export const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
        throw new Error('Cloudinary configuration is missing')
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", uploadPreset);
    formData.append("folder", import.meta.env.VITE_CLOUDINARY_FOLDER);

    try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
          formData
        );

        return response.data.secure_url
    } catch (error) {
        console.error('Cloudinary upload error', error);
        throw new Error('File upload Error!')
    }
}