import { NextResponse, NextRequest } from "next/server";
import { createClient } from '@/app/api/supabase/server';


export async function POST(req: NextRequest) {

  const supabase = await createClient()

  
  try {
        const formData = await req.formData();
        
      const { data, error } = await supabase.from('your_table').select('*')

      NextResponse.json({ message: data });

        if (error) {
            throw error;
          }
    }
    catch (error) {
        return NextResponse.json(
            { error: "Error en el servidor", details: error },
            { status: 500 },
          );
    }
  }