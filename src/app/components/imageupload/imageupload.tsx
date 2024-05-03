// // ImageUpload.js
// import React, { useState } from "react";
// // import { FileUploader } from "cloudinary-react";
// import { CldImage } from "next-cloudinary";
// import apiService from "@/app/apiService";

// const ImageUpload = () => {
//   const [imageUrl, setImageUrl] = useState("");

//   const handleUpload = (info:any) => {
//     if (info.event === "success") {
//       setImageUrl(info.info.secure_url);
//       uploadImageToBackend(info.info.secure_url);
//     }
//   };

//   const uploadImageToBackend = async (imageUrl:any) => {
//     try {
//       const response = await apiService.post("/api/upload/", { image_url: imageUrl });
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error uploading image:", error);
//     }
//   };

//   return (
//     <div>
//       <CldImage 
//       width="600" height="600" 
//       src="<Public ID or Cloudinary URL>" alt="<Alt Text>" />
//       <FileUploader
//         cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
//         apiKey="771122555868975"
//         uploadPreset="your_upload_preset"
//         folder="your_folder"
//         resourceType="image"
//         cropping
//         onUpload={handleUpload}
//       />
//       {imageUrl && <img src={imageUrl} alt="Uploaded" />}
//     </div>
//   );
// };

// export default ImageUpload;
