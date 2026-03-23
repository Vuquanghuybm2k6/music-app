import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { Request, Response, NextFunction } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

export const upload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const file = (req as any).file; 

    if (!file) {
      return next();
    }

    const streamUpload = (): Promise<any> => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(stream); // dùng file đã ép kiểu
      });
    };

    const result = await streamUpload();

    // gán link ảnh vào body
    req.body[file.fieldname] = result.secure_url;

    next();
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).send("Upload failed");
  }
};