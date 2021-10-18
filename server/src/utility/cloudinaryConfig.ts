import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";
import {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
} from "../constants";

/**
 * [Uploads images to Cloudinary]
 *
 * @async
 * @param {string} path - [ can be realative path , or the actual hosted image url]
 * @returns {Promise<UploadApiResponse | UploadApiErrorResponse>} [Returns the Success object or the error object]
 */
export const uploadToCloudinary = async (
  path: string
): Promise<UploadApiResponse | UploadApiErrorResponse> => {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });

  try {
    return cloudinary.uploader.upload(path, {
      resource_type: "image",
      folder: "profilePictures",
    });
  } catch (err: unknown) {
    return err as UploadApiErrorResponse;
  }
};
