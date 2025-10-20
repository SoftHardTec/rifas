interface fileData{
    file: File | null;
}

export default async function CloudinaryFileSubmit({
  file,
}: fileData): Promise<string | undefined> {
  if (!file) {
    throw new Error("Por favor, selecciona un comprobante.");
  }
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch("/api/cloudinary/upload", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();
      return data.url;
    } else {
      throw new Error("Error al subir la imagen. Por favor, inténtalo de nuevo.");
    }
  } catch (error) {
    console.error("Error al subir a Cloudinary:", error);
    throw new Error("Ocurrió un error de red al subir la imagen.");
  }
}
