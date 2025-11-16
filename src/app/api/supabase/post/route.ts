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
    const idEntry = formData.get("id");
    const numberIdEntry = formData.get("NumberId");
    const numberPhoneEntry = formData.get("NumberPhone");
    const phoneCodeEntry = formData.get("PhoneCode");
    const referenceEntry = formData.get("reference");
    const bankEntry = formData.get("bank");
    const fileUrlEntry = formData.get("fileUrl");
    const methodPayEntry = formData.get("method_pay");
    const amountEntry = formData.get("amount");
    const ticketCountEntry = formData.get("ticketCount");
    const sellerEntry = formData.get("vendedor");
    
    const name = typeof nameEntry === "string" ? nameEntry : undefined;
    const email = typeof emailEntry === "string" ? emailEntry : undefined;
    const id = typeof idEntry === "string" ? idEntry : undefined;
    const card_id = typeof numberIdEntry === "string" ? numberIdEntry : undefined;
    const phoneCode = typeof phoneCodeEntry === "string" ? phoneCodeEntry : "";
    const phone = typeof numberPhoneEntry === "string" ? numberPhoneEntry : undefined;
    const file_url = fileUrlEntry as string;
    const reference = typeof referenceEntry === "string" ? referenceEntry : undefined;
    const bank = typeof bankEntry === "string" ? bankEntry : null;
    const method_pay = typeof methodPayEntry === "string" ? methodPayEntry : undefined;
    const amount = typeof amountEntry === "string" ? amountEntry : undefined;
    const ticketCount = typeof ticketCountEntry === "string" ? parseInt(ticketCountEntry, 10) : undefined;
    const seller = typeof sellerEntry === "string" && sellerEntry ? sellerEntry : null;
    

    // 2. Generar boletos únicos (esto sigue siendo una llamada separada y está bien)
    const tickets = await createUniqueTickets(ticketCount || 0);
    const ticketNumbers = tickets.map(t => t.tickets);
    
    // 3. Llamar a la función RPC con todos los datos en una sola llamada
    const { data: userId, error: rpcError } = await supabase.rpc('create_purchase_and_tickets', {
      p_name: name,
      p_email: email,
      p_id: id,
      p_card_id: card_id,
      p_phone_code: phoneCode,
      p_phone: phone,
      p_file_url: file_url,
      p_reference: reference,
      p_bank: bank,
      p_method_pay: method_pay,
      p_amount: amount,
      p_ticket_count: ticketCount,
      p_tickets: ticketNumbers,
      p_seller: seller
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
    const errorMessage = error instanceof Error ? error.message : "Ah ocurrido un error, vuelva a intentarlo";
    console.error("Supabase POST error:", errorMessage);
    console.error("Supabase POST error details:", error);
    return NextResponse.json(
      { error: errorMessage, details: String(error) },
      // Usamos 400 para errores del cliente como "no hay tickets"
      // y 500 para errores inesperados del servidor.
      { status: errorMessage.includes("tickets") || errorMessage.includes("agotados") ? 400 : 500 }
    );
  }
}

/*
Fuction Supabase Database 

CREATE OR REPLACE FUNCTION public.create_purchase_and_tickets(
    p_name text,
    p_email text,
    p_id text,
    p_card_id text,
    p_phone_code text,
    p_phone text,
    p_file_url text,
    p_reference text,
    p_bank text,
    p_method_pay text,
    p_amount text,
    p_ticket_count integer,
    p_tickets text[]
    p_seller
)
RETURNS integer -- Devuelve el ID del usuario procesado
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id int;
    v_pay_id int;
BEGIN
    -- 1. Buscar el usuario existente por su cédula.
    SELECT id_user INTO v_user_id FROM public.user_data WHERE id_card = p_card_id;

    -- 2. Si el usuario no existe (v_user_id es NULL), insertarlo.
    IF v_user_id IS NULL THEN
        INSERT INTO public.user_data (name, email, id_nations, id_card, phone_code, phone)
        VALUES (p_name, p_email, p_id, p_card_id, p_phone_code, p_phone)
        ON CONFLICT (id_card) DO NOTHING -- Si hay una condición de carrera, no hace nada.
        RETURNING id_user INTO v_user_id;
        
        -- Si después del intento de inserción sigue siendo NULL (porque otra transacción lo insertó justo ahora)
        -- lo volvemos a buscar para asegurar que tenemos el ID.
        IF v_user_id IS NULL THEN
             SELECT id_user INTO v_user_id FROM public.user_data WHERE id_card = p_card_id;
        END IF;
    END IF;

    -- 3. Insertar los datos del pago asociados al usuario.
    INSERT INTO public.pay_data (method_pay, voucher, reference, bank, amount, user_id, seller)
    VALUES (p_method_pay, p_file_url, p_reference, p_bank, p_amount, v_user_id, p_seller, p_ticket_count)
    RETURNING id_pay INTO v_pay_id;

    -- 4. Insertar todos los boletos en una sola operación usando UNNEST.
    IF array_length(p_tickets, 1) > 0 THEN
        INSERT INTO public.tickets (tickets, user_id, pay_id)
        SELECT ticket, v_user_id, v_pay_id
        FROM unnest(p_tickets) AS t(ticket);
    END IF;

    -- 5. Insertar el resumen de la compra.
    INSERT INTO public.user_tickets (user_tickets, user_id, pay_id)
    VALUES (p_ticket_count, v_user_id, v_pay_id);

    -- 6. Devolver el ID del usuario que realizó la compra.
    RETURN v_user_id;
END;
$$;


*/
