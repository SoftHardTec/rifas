import { NextResponse, NextRequest } from "next/server";
import { createClient } from '@/app/api/supabase/server';
import { createUniqueTickets } from "@/utils/CreateTickets";


export async function POST(req: NextRequest) {
  
  const supabase = await createClient()
  try {
    const formData = await req.formData();
    
    // Extraer
    const nameEntry = formData.get("name");
    const emailEntry = formData.get("email");
    const numberIdEntry = formData.get("NumberId");
    const numberPhoneEntry = formData.get("NumberPhone");
    const phoneCodeEntry = formData.get("phoneCode");
    const referenceEntry = formData.get("reference");
    const bankEntry = formData.get("bank");
    const fileUrlEntry = formData.get("fileUrl");
    const methodPayEntry = formData.get("method_pay");
    const amountEntry = formData.get("amount");
    const ticketCountEntry = formData.get("ticketCount");
    
    
    
    // Sanear valores
    const name = typeof nameEntry === "string" ? nameEntry : undefined;
    const email = typeof emailEntry === "string" ? emailEntry : undefined;
    const card_id =
    typeof numberIdEntry === "string"
    ? parseInt(numberIdEntry, 10)
    : undefined;
    const phoneCode = typeof phoneCodeEntry === "string" ? phoneCodeEntry : "";
    const phone = typeof numberPhoneEntry === "string" ? parseInt(numberPhoneEntry, 10) : undefined;
    
    const file_url = fileUrlEntry
    const reference = typeof referenceEntry === "string" ? referenceEntry : undefined;
    const bank = typeof bankEntry === "string" ? bankEntry : null;
    const method_pay = typeof methodPayEntry === "string" ? methodPayEntry : undefined;
    const amount = typeof amountEntry === "string" ? amountEntry : undefined;
    const ticketCount = typeof ticketCountEntry === "string" ? parseInt(ticketCountEntry, 10) : undefined;
    const tickets = await createUniqueTickets(ticketCount || 0);
    
    // Verificar si el usuario ya existe
    const { data: data_user_existing, error: error_user_existing } = await supabase
      .from("user_data")
      .select("id_user")
      .eq("id_card", card_id);

    if (error_user_existing) throw error_user_existing;

    let id_user: number | null = null;
    if (data_user_existing && data_user_existing.length > 0) {
      // El usuario ya existe, tomar su id_user
      id_user = data_user_existing[0].id_user;
    } else {
      // No existe, insertar y obtener el id_user
      const { data: data_user_insert, error: error_user_insert } = await supabase
        .from("user_data")
        .insert([
          {
            name: name,
            email: email,
            id_card: card_id,
            phone_code: phoneCode,
            phone: phone,
          },
        ])
        .select("id_user")
        .single();
      if (error_user_insert) throw error_user_insert;
      id_user = data_user_insert.id_user;
    }

console.log({file_url, reference, bank, method_pay, amount, tickets});

    //insert pay_data
    const { error: error_pay } = await supabase.from("pay_data").insert([
      {
        method_pay: method_pay,
        voucher: file_url,
        reference: reference,
        bank: bank,
        amount: amount,
        user_id: id_user,
      },
    ])
    if (error_pay) {
      throw error_pay;
    }

    //insert tickets

      if (tickets.length > 1) {
      const {data: tickets_user, error: error_tickets } = await supabase
        .from("tickets")
        .insert(tickets.map(t => ({ tickets: t.tickets, user_id: id_user })));
      if (error_tickets) {
        throw error_tickets;
      }
      console.log({tickets_user})
      }

    const { error: error_user_tickets } = await supabase.from("user_tickets").insert([
        { 
          user_tickets: ticketCount,
          user_id: id_user,
        }
    ])
    if (error_user_tickets) {
      throw error_user_tickets;
    }
    return NextResponse.json({ message: "Datos guardados con éxito"});
  } catch (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json(
      { error: "Error al guardar en Supabase", details: String(error) },
      { status: 500 }
    );
  }
}