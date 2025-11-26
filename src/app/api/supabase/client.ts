      import { createClient } from '@supabase/supabase-js';

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!; // or your actual URL
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // or your actual public key

        export  const supabase = createClient(supabaseUrl, supabaseAnonKey);