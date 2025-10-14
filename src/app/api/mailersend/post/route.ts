import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@/app/api/supabase/server";

interface PayData {
  method_pay: string;
  voucher: string;
  reference: string;
  bank: string;
  amount: string;
  validated: boolean;
}
interface User {
  id_user: number;
  name: string;
  email: string;
  pay_data: PayData[];
  tickets: { id_tickets: number, tickets: number }[];
}

async function getUsersToSendEmail() {
  const supabase = await createClient();
  return supabase.from('user_data').select('id_user, name, email, pay_data(method_pay, voucher, reference, bank, amount, validated), tickets(id_tickets, tickets)').eq('pay_data.validated', true).eq('tickets.email_send', false);
}

export async function GET() {
  try {
  const { data, error } = await getUsersToSendEmail();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ data });
  } catch (error) {
    console.error("Supabase fetch error:", error);
    return NextResponse.json(
      { error: "Error al obtener datos de Supabase", details: String(error) },
      { status: 500 }
    );
}
}

export async function POST(request: NextRequest) {
  try {
    // --- INICIO DE LA PROTECCIÓN DEL ENDPOINT ---
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new Response('Unauthorized', {
        status: 401,
      });
    }
    // --- FIN DE LA PROTECCIÓN ---
    const supabase = await createClient();
    // 1. Obtener los datos de los usuarios llamando a la función GET
    const { data: users, error: fetchError } = await getUsersToSendEmail();

    if (fetchError || !Array.isArray(users)) {
      return NextResponse.json({ error: "Fallo al obtener usuarios o formato de datos inválido.", details: fetchError }, { status: 500 });
    }

    if (users.length === 0) {
      return NextResponse.json({ message: "No hay usuarios a los que enviar correos." });
    }

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY!,
    });

    const sentFrom = new Sender("prueba-vz9dlem2e5n4kj50.mlsender.net");

    const results = {
      success: [] as number[],
      failed: [] as { id_user: number; error: string }[],
    };

    // 2. Iterar sobre cada usuario para enviar un correo personalizado
    for (const user of users as User[]) {
      try {
        const recipients = [new Recipient(user.email, user.name)];
        // Formatear los números de boleto para que se vean bien
        const ticketNumbers = user.tickets.map(t => t.tickets.toString().padStart(4, '0')).join(', ');
        const totalTickets = user.tickets.length;

        const personalization = [
  {
    email: '{user.email}',
    data: {
      fecha: '',
      estado: '',
      honorarios: '',
      account_name: '',
      id_de_recibo: '',
      support_email: ''
    },
  }
];

        const emailParams = new EmailParams()
          .setFrom(sentFrom)
          .setTo(recipients)
          .setReplyTo(sentFrom)
          .setSubject("¡Tus boletos para la rifa de La Pampara!")
          .setPersonalization(personalization)



        await mailerSend.email.send(emailParams);

        // 3. Actualizar la base de datos para marcar el correo como enviado
        const ticketIdsToUpdate = user.tickets.map(t => t.id_tickets);

        const { error: updateError } = await supabase
          .from('tickets')
          .update({ email_send: true })
          .in('id_tickets', ticketIdsToUpdate);

        if (updateError) throw new Error(`Fallo al actualizar el estado email_send: ${updateError.message}`);

        results.success.push(user.id_user);
      } catch (error: any) {
        console.error(`Fallo al enviar correo al usuario ${user.id_user}:`, error);
        results.failed.push({ id_user: user.id_user, error: error.body ? JSON.stringify(error.body) : String(error.message || error) });
      }
    }

    return NextResponse.json({ message: "Proceso de envío de correos completado.", results });
  } catch (error) {
    console.error("Error en POST /api/mailersend/post:", error);
    return NextResponse.json({ error: "Ocurrió un error inesperado.", details: String(error) }, { status: 500 });
  }
}