import {createClient} from '@/app/api/supabase/server';
import {NextResponse} from "next/server";

export async function GET() {
    const supabase = await createClient()
    try {
        const { count, error } = await supabase.from('tickets').select('*', { count: 'exact', head: true })

        if (error) {
            throw error;
        }       
        return NextResponse.json({ count });
    } catch (error) {
        console.error("[API] Error en el servidor:", error);
        return NextResponse.json(
            {error: "Error en el servidor", details: error},
            {status: 500},
        );
    }
}