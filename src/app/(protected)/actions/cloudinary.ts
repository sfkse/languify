import { logger } from "../lib/logging/logger";

export async function uploadCloudinary(formData: FormData) {
  const cloudinaryResponse = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const cloudinaryData = await cloudinaryResponse.json();
  if (!cloudinaryResponse.ok) {
    logger.error(`Cloudinary upload failed: ${cloudinaryData.error}`);
    throw new Error(cloudinaryData.error || "Upload failed");
  }
  return cloudinaryData;
}

