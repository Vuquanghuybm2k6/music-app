import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import { Request, Response, NextFunction } from "express";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const uploadToCloudinary = (buffer: Buffer): Promise<string> => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {resource_type: "auto"},
      (error, result) => {
        if (result) resolve(result.secure_url);
        else reject(error);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const upload = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = (req as any).file;

    if (!file) return next();

    const result = await uploadToCloudinary(file.buffer);

    req.body[file.fieldname] = result;

    next();
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).send("Upload failed");
  }
};

export const uploadSingle = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await uploadToCloudinary((req as any)["file"].buffer);
    req.body[(req as any)["file"].fieldname] = result;
  } catch (error) {
    console.log(error);
  }

  next();
};

export const uploadFields = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = (req as any).files;

    if (!files) return next();

    for (const key in files) {
      req.body[key] = [];

      for (const item of files[key]) {
        const result = await uploadToCloudinary(item.buffer);
        req.body[key].push(result);
      }
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(500).send("Upload failed");
  }
};