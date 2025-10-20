import { NextResponse, NextRequest } from "next/server";
import { createClient } from '@/app/api/supabase/server';
import { createUniqueTickets } from "@/utils/CreateTickets";


export async function POST(req: NextRequest) {
  
  const supabase = await createClient()
  try {
    const formData = await req.formData();
    
    // 1. Extraer y sanear datos del FormData
    const nameEntry = formData.get("name");
    const emailEntry = formData.get("email");
    const numberIdEntry = formData.get("NumberId");
    const numberPhoneEntry = formData.get("NumberPhone");
    const phoneCodeEntry = formData.get("PhoneCode");
    const referenceEntry = formData.get("reference");
    const bankEntry = formData.get("bank");
    const fileUrlEntry = formData.get("fileUrl");
    const methodPayEntry = formData.get("method_pay");
    const amountEntry = formData.get("amount");
    const ticketCountEntry = formData.get("ticketCount");
    
    const name = typeof nameEntry === "string" ? nameEntry : undefined;
    const email = typeof emailEntry === "string" ? emailEntry : undefined;
    const card_id = typeof numberIdEntry === "string" ? parseInt(numberIdEntry, 10) : undefined;
    const phoneCode = typeof phoneCodeEntry === "string" ? phoneCodeEntry : "";
    const phone = typeof numberPhoneEntry === "string" ? parseInt(numberPhoneEntry, 10) : undefined;
    const file_url = fileUrlEntry as string;
    const reference = typeof referenceEntry === "string" ? parseInt(referenceEntry, 10) : undefined;
    const bank = typeof bankEntry === "string" ? bankEntry : null;
    const method_pay = typeof methodPayEntry === "string" ? methodPayEntry : undefined;
    const amount = typeof amountEntry === "string" ? amountEntry : undefined;
    const ticketCount = typeof ticketCountEntry === "string" ? parseInt(ticketCountEntry, 10) : undefined;

    // 2. Generar boletos únicos (esto sigue siendo una llamada separada y está bien)
    const tickets = await createUniqueTickets(ticketCount || 0);
    const ticketNumbers = tickets.map(t => t.tickets);
    
    // 3. Llamar a la función RPC con todos los datos en una sola llamada
    const { data: userId, error: rpcError } = await supabase.rpc('create_purchase_and_tickets', {
      p_name: name,
      p_email: email,
      p_card_id: card_id,
      p_phone_code: phoneCode,
      p_phone: phone,
      p_file_url: file_url,
      p_reference: reference,
      p_bank: bank,
      p_method_pay: method_pay,
      p_amount: amount,
      p_ticket_count: ticketCount,
      p_tickets: ticketNumbers
    });
    
    if (rpcError) {
      throw rpcError;
    }

    // 4. Obtener los datos completos para devolverlos al cliente en una sola consulta
    const { data: finalUserData, error: finalUserDataError } = await supabase
      .from('user_data')
      .select('*, pay_data(*), tickets(*)')
      .eq('id_user', userId)
      .single();
    
    if (finalUserDataError) throw finalUserDataError;

    const data = {
      userData: finalUserData,
      tickets: ticketNumbers,
      data_pay: finalUserData.pay_data
    };

    return NextResponse.json({ data});
  } catch (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      { error: "Ocurrio un error al guardar en Supabase", details: String(error) },
      { status: 500 }
    );
  }
}
