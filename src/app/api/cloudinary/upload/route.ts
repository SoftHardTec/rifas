import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// --- Environment Variable Validation ---
const { NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, NEXT_PUBLIC_CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env;

if (!NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !NEXT_PUBLIC_CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
  console.error("Cloudinary environment variables are not set");
  // In a real app, you might want to throw an error at startup
}

// --- Cloudinary Configuration ---
// Moved outside the POST handler to run only once on module load.
cloudinary.config({
  cloud_name: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

// --- Types ---
interface UploadApiResponse {
  secure_url: string;
  public_id: string;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No se recibió archivo válido" },
        { status: 400 },
      );
    }
  
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Promisify the upload stream
    const uploadPromise = new Promise<UploadApiResponse>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { upload_preset: "comprobantes" },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          // The result can be undefined on certain errors, so check for it.
          if (!result) {
            return reject(new Error("Cloudinary upload failed, no result received."));
          }
          resolve(result as UploadApiResponse);
        }
      );
      streamifier.createReadStream(buffer).pipe(stream);
    });

    const result = await uploadPromise;

    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    return NextResponse.json({ error: "Error en el servidor al subir la imagen." }, { status: 500 });
  }
}
