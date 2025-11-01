interface FormValues {
  email: string;
  name: string;
  PhoneCode: string;
  id: string; // Agrega la propiedad que falta
  NumberPhone: string;
  NumberId: string;
  bank: string;
  reference: string;
}

interface SupabaseSubmitParams {
  values: FormValues;
  imageUrl: string;
  methodPage: string | null;
  ticketCount: number | null;
  amount: string;
}

export default async function supabaseSubmit ({
  values,
  imageUrl,
  methodPage,
  ticketCount,
  amount,
}: SupabaseSubmitParams): Promise<Response> {
  const bank =
    methodPage === "venezuela" || methodPage === "mercantil"
      ? values.bank
      : "Moneda extranjera";


  const formdata = new FormData();
  formdata.append("email", values.email);
  formdata.append("name", values.name);
  formdata.append("PhoneCode", values.PhoneCode);
  formdata.append("NumberPhone", values.NumberPhone);
  formdata.append("NumberId", values.NumberId);
  formdata.append("id", values.id);
  formdata.append("bank", bank);
  formdata.append("reference", values.reference);
  formdata.append("fileUrl", imageUrl);
  formdata.append("method_pay", methodPage || "");
  formdata.append("ticketCount", ticketCount ? ticketCount.toString() : "0");
  formdata.append("amount", amount);

  return fetch("api/supabase/post", {
    method: "POST",
    body: formdata,
  });
};