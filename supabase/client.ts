import { Database } from "../database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validaciones tempranas para evitar fallos opacos de red
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Faltan variables de entorno de Supabase. Define NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local"
  );
}

if (!/^https?:\/\//.test(supabaseUrl)) {
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL debe comenzar con http:// o https:// (revisa tu .env.local)"
  );
}

if (process.env.NODE_ENV !== "production") {
  console.log("[Supabase] URL:", supabaseUrl);
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;