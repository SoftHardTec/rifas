import { NextResponse, NextRequest } from "next/server";
import { createClient } from '@/app/api/supabase/server';
import Tickets from "@/components/raffle/Tickets";


export async function POST(req: NextRequest) {
  const supabase = await createClient()
  try {
    const formData = await req.formData();
    const idCardEntry = formData.get("idCard");
    const idCard = typeof idCardEntry === "string" ? parseInt(idCardEntry, 10) : undefined;
    console.log("[API] ID Card recibida:", idCard);
    // JOIN entre user_data, pay_data y tickets
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
      if (data && data.length > 0) {
        console.log(data[0]);
      } else {
        console.log("No tickets found for the given ID card.");
      }
    if (error) {
      console.error("[API] Error en la consulta:", error);
      throw error;
    }
    return NextResponse.json({ data });
    
  }
  catch (error) {
    console.error("[API] Error en el servidor:", error);
    return NextResponse.json(
      { error: "Error en el servidor", details: error },
      { status: 500 },
    );
  }
}