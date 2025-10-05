import { createClient} from "@/app/api/supabase/server";


export async function getAvailableTickets(desiredNumbers: number[]): Promise<number[]> {
    const supabase = await createClient();
  const { data, error } = await supabase
    .from("tickets")
    .select("tickets")
    .in("tickets", desiredNumbers);
  if (error) throw error;
  const existing = data?.map(t => t.tickets) ?? [];
  return desiredNumbers.filter(n => !existing.includes(n));
}

export async function createUniqueTickets(count: number): Promise<{ tickets: string }[]> {
  const maxTickets = 10000; // 5 dígitos posibles (00000-99999)
  const available: number[] = [];
  let intentos = 0;
  while (available.length < count && intentos < 10) {
    // Generar candidatos aleatorios
    const generated: Set<number> = new Set();
    while (generated.size < (count - available.length)) {
      generated.add(Math.floor(Math.random() * maxTickets));
    }
    const candidates = Array.from(generated);
    // Verificar cuáles ya existen
    const existing = await getAvailableTickets(candidates);
    available.push(...existing);
    intentos++;
  }
  
  const finalTickets = available.slice(0, count);
  // Formatear a 5 dígitos con ceros a la izquierda
  const submitTickets = finalTickets.map(n => ({ tickets: n.toString().padStart(5, '0') }));
  if (submitTickets.length === 0) return [];
  return submitTickets;
}

