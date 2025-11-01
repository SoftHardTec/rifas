import { createClient } from "@/app/api/supabase/server";

interface TicketDB {
  tickets: string; // Cambiado a string
}

export async function filterAvailableTickets(desiredNumbers: string[]): Promise<string[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tickets")
    .select("tickets")
    .in("tickets", desiredNumbers);
  if (error) throw error;
  const existing: string[] = (data as TicketDB[] | null)?.map((t) => t.tickets) ?? [];
  return desiredNumbers.filter((n) => !existing.includes(n));
}

export async function createUniqueTickets(count: number): Promise<{ tickets: string }[]> {
  const available: string[] = [];
  let intentos = 0;
  while (available.length < count && intentos < 10) {
    // Generar candidatos aleatorios
    const generated: Set<string> = new Set();
    while (generated.size < count - available.length) {
      // Genera un número aleatorio entre 0 y 9999
      const ticketNumber = Math.floor(Math.random() * 10000);
      // Convierte a string y asegura que tenga 4 dígitos con ceros a la izquierda
      generated.add(String(ticketNumber).padStart(4, '0'));
    }
    const candidates = Array.from(generated);
    // Filtrar para obtener solo los que no existen en la BD
    const availableCandidates = await filterAvailableTickets(candidates);
    available.push(...availableCandidates);
    intentos++;
  }
  const finalTickets = available.slice(0, count);
  // Mapear a la estructura de objeto esperada, manteniendo el tipo string
  const submitTickets = finalTickets.map((n) => ({ tickets: n }));
  if (submitTickets.length === 0)
    throw new Error("No hay más tickets disponibles. Todos los números han sido asignados.");
  return submitTickets;
}
