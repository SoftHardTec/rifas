import { NextResponse, NextRequest } from "next/server";
import { createClient } from '@/app/api/supabase/server';


export async function POST(req: NextRequest) {

  const supabase = await createClient()
  try {
    const formData = await req.formData();

    // Extraer
    const nameEntry = formData.get("name");
    const emailEntry = formData.get("email");
    const numberIdEntry = formData.get("NumberId");
    const numberPhoneEntry = formData.get("NumberPhone");

    // Sanear valores
    const name = typeof nameEntry === "string" ? nameEntry : undefined;
    const email = typeof emailEntry === "string" ? emailEntry : undefined;
    const card_id =
      typeof numberIdEntry === "string"
        ? parseInt(numberIdEntry, 10)
        : undefined;
    const phone =
      typeof numberPhoneEntry === "string"
        ? parseInt(numberPhoneEntry, 10)
        : undefined;
console.log({ name, email, card_id, phone });
    const {data, error } = await supabase
      .from("user_data")
      .insert([
        {
          name: name,
          email: email,
          id_card: Number.isFinite(card_id as number) ? (card_id as number) : undefined,
          phone: Number.isFinite(phone as number) ? (phone as number) : undefined,
        },
      ])
      .select();

    if (error) {
      throw error;
    }

    return NextResponse.json({ message: "Datos guardados con éxito", data });
  } catch (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      { error: "Error al guardar en Supabase", details: String(error) },
      { status: 500 }
    );
  }
}