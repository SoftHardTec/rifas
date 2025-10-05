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
    const phone = typeof numberPhoneEntry === "string" ? parseInt(numberPhoneEntry, 10) : undefined;
    
    const file_url = fileUrlEntry
    const reference = typeof referenceEntry === "string" ? referenceEntry : undefined;
    const bank = typeof bankEntry === "string" ? bankEntry : null;
    const method_pay = typeof methodPayEntry === "string" ? methodPayEntry : undefined;
    const amount = typeof amountEntry === "string" ? amountEntry : undefined;
    const ticketCount = typeof ticketCountEntry === "string" ? parseInt(ticketCountEntry, 10) : undefined;

    console.log({ name, email, card_id, phone, ticketCount });

    //insert user_data
    const { error: error_user } = await supabase
      .from("user_data")
      .insert([
        {
          name: name,
          email: email,
          id_card: card_id,
          phone: phone,
          number_tickets: ticketCount,
        },
      ])
    if (error_user) {
      throw error_user;
    }

console.log({file_url, reference, bank, method_pay, amount});

    //insert pay_data
    const { error: error_pay } = await supabase.from("pay_data").insert([
      {
        method_pay: method_pay,
        voucher: file_url,
        reference: reference,
        bank: bank,
        amount: amount,
      },
    ])
    if (error_pay) {
      throw error_pay;
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