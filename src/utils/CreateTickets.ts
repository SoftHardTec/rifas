import { createClient } from "@/app/api/supabase/server";

interface TicketDB {
  tickets: string;
}

/**
 * Obtiene todos los tickets existentes de la base de datos con paginación
 */
async function getAllExistingTickets(): Promise<string[]> {
  const supabase = await createClient();
  const allTickets: string[] = [];
  let from = 0;
  const pageSize = 1000; // Supabase limita a 1000 por defecto
  
  while (true) {
    const { data, error } = await supabase
      .from("tickets")
      .select("tickets")
      .range(from, from + pageSize - 1);
    
    if (error) {
      console.error("[CreateTickets] Error al obtener tickets existentes:", error);
      throw error;
    }
    
    if (!data || data.length === 0) {
      break; // No hay más datos
    }
    
    const tickets: string[] = (data as TicketDB[]).map((t) => t.tickets);
    allTickets.push(...tickets);
    
    // Si obtenimos menos de pageSize, significa que no hay más páginas
    if (data.length < pageSize) {
      break;
    }
    
    from += pageSize;
  }
  
  console.log(`[CreateTickets] Tickets existentes encontrados: ${allTickets.length}`);
  return allTickets;
}

/**
 * Genera todos los números del rango 0000-9999 y filtra los que están disponibles (no existen en BD)
 */
async function getAllAvailableTickets(): Promise<string[]> {
  // Generar todos los números del rango 0000-9999
  const allPossibleTickets: string[] = [];
  for (let i = 0; i < 10000; i++) {
    allPossibleTickets.push(String(i).padStart(4, '0'));
  }

  // Obtener todos los tickets existentes en la BD
  const existingTickets = await getAllExistingTickets();
  const existingSet = new Set(existingTickets);

  // Filtrar para obtener solo los tickets disponibles (que NO están en la BD)
  const availableTickets = allPossibleTickets.filter(ticket => !existingSet.has(ticket));
  
  return availableTickets;
}

/**
 * Selecciona aleatoriamente 'count' elementos de un array
 */
function selectRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Crea tickets únicos seleccionando aleatoriamente de los tickets disponibles del rango 0000-9999
 */
export async function createUniqueTickets(count: number): Promise<{ tickets: string }[]> {
  // Validar que count sea un número válido
  if (!count || count <= 0 || !Number.isInteger(count)) {
    throw new Error("La cantidad de tickets debe ser un número entero mayor a 0");
  }

  try {
    // Obtener todos los tickets disponibles del rango completo 0000-9999
    const allAvailable = await getAllAvailableTickets();
    
    console.log(`[CreateTickets] Tickets disponibles: ${allAvailable.length}, Solicitados: ${count}`);

    // Verificar si hay suficientes tickets disponibles
    if (allAvailable.length < count) {
      throw new Error("YA NO HAY TICKETS DISPONIBLES");
    }

    // Seleccionar aleatoriamente 'count' tickets de los disponibles
    const selectedTickets = selectRandomItems(allAvailable, count);
    
    console.log(`[CreateTickets] Tickets seleccionados: ${selectedTickets.length}`);

    // Mapear a la estructura de objeto esperada
    const submitTickets = selectedTickets.map((n) => ({ tickets: n }));
    return submitTickets;
  } catch (error) {
    console.error("[CreateTickets] Error en createUniqueTickets:", error);
    // Re-lanzar el error para que el route lo maneje
    throw error;
  }
}
