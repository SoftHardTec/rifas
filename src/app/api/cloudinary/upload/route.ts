import { NextResponse, NextRequest } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

// La configuración de Cloudinary se mueve dentro de la función POST
// para asegurar que las variables de entorno se carguen correctamente.
export async function POST(req: NextRequest) {
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json(
        { error: "No se recibió archivo válido" },
        { status: 400 },
      );
    }
    // Opcional: subir a Cloudinary aquí
    // Convertir el archivo a buffer antes de subir
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadStream = () =>
      new Promise<{ secure_url: string; public_id: string }>(
        (resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { upload_preset: "comprobantes" },
            (error, result) => {
              if (error) return reject(error);
              // Tipar el resultado para evitar errores
              resolve(result as { secure_url: string; public_id: string });
            },
          );
          streamifier.createReadStream(buffer).pipe(stream);
        },
      );
    const result = await uploadStream();
    return NextResponse.json({
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor", details: error },
      { status: 500 },
    );
  }
}

// subir desde el front

//   const filesubmit = async () => {
//     if (!(file instanceof File)) {
//       alert("Selecciona un archivo válido antes de enviar");
//       return;
//     }
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "comprobantes");
//     try {
//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/digenlr4m/image/upload",
//         {
//           method: "POST",
//           body: formData,
//         },
//       );
//       if (!res.ok) {
//         const errorText = await res.text();
//         throw new Error(`Error del servidor: ${errorText}`);
//       }
//       const data = await res.json();
//       if (data.secure_url) {
//         alert(`Imagen subida: ${data.secure_url}`);
//       } else {
//         alert("No se recibió URL de imagen");
//       }
//     } catch (err) {
//       if (err instanceof Error) {
//         alert(`Error al subir: ${err.message}`);
//       } else {
//         alert("Error desconocido al subir");
//       }
//     }
//   };
