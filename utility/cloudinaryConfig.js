//utility/cloudinaryConfig.js
import { v2 as cloudinary } from "cloudinary";
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("config", cloudinary.config());
export default cloudinary;
