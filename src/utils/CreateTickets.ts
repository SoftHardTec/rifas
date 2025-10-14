import { createClient } from "@/app/api/supabase/server";

interface TicketDB {
  tickets: number;
}

export async function filterAvailableTickets(desiredNumbers: number[]): Promise<number[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tickets")
    .select("tickets")
    .in("tickets", desiredNumbers);
  if (error) throw error;
  const existing: number[] = (data as TicketDB[] | null)?.map((t) => t.tickets) ?? [];
  return desiredNumbers.filter((n) => !existing.includes(n));
}

export async function createUniqueTickets(count: number): Promise<{ tickets: number }[]> {
  const available: number[] = [];
  let intentos = 0;
  while (available.length < count && intentos < 10) {
    // Generar candidatos aleatorios
    const generated: Set<number> = new Set();
    while (generated.size < count - available.length) {
      // Genera un número aleatorio de 4 dígitos (entre 1000 y 9999)
      // Genera un número aleatorio entre 0 y 9999
      generated.add(Math.floor(Math.random() * 10000));
    }
    const candidates = Array.from(generated);
    // Filtrar para obtener solo los que no existen en la BD
    const availableCandidates = await filterAvailableTickets(candidates);
    available.push(...availableCandidates);
    intentos++;
  }
  const finalTickets = available.slice(0, count);
  // Mapear a la estructura de objeto esperada, manteniendo el tipo numérico
  const submitTickets = finalTickets.map((n) => ({ tickets: n }));
  if (submitTickets.length === 0)
    throw new Error("No hay más tickets disponibles. Todos los números han sido asignados.");
  return submitTickets;
}
