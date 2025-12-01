import { NextResponse, NextRequest } from "next/server";
import { createClient } from '@/app/api/supabase/server';



export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const formData = await req.formData();
    const idCardEntry = formData.get("idCard");
    const idCard = typeof idCardEntry === "string" ? parseInt(idCardEntry, 10) : undefined;
    const { data, error } = await supabase
      .from('user_data')
      .select(`
        id_user,
        name,
        email,
        id_card,
        pay_data(validated),
        tickets(tickets)
      `)
      .eq('id_card', idCard);
    if (error) {
      console.error("[API] Error en la consulta:", error);
      throw error;
    }
    return NextResponse.json({ data });
    
  }
  catch (error) {
    console.error("Error en el servidor:", error);
    return NextResponse.json(
      { error: "Error en el servidor", details: error },
      { status: 500 },
    );
  }
}