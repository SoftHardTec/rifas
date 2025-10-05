"use client";

import {
  Card,
  NumberInput,
  SimpleGrid,
  TextInput,
  Select,
  Group,
  FileInput,
  Button,
} from "@mantine/core";
import { countries } from "@/utils/PhoneCode";
import { optionId } from "@/utils/OptionId";
import { banks } from "@/utils/bankData";
import { useForm } from "@mantine/form";
import { useState } from "react";

interface UserDataProps {
  methodPage: string | null;
  ticketCount: number | null;
}
export default function UserData({ methodPage, ticketCount }: UserDataProps) {
  const [file, setFile] = useState<File | null>(null);

  console.log("methodPage:", methodPage);
  console.log("ticketCount:", ticketCount);
  const selectPhoneCode = countries.map((PhoneCode) => ({
    label: `${PhoneCode.flagEmoji} ${PhoneCode.phoneCode}`,
    value: `${PhoneCode.phoneCode} ${PhoneCode.name}`,
  }));
  const selectId = optionId.map((id) => ({
    label: id.label,
    value: id.value,
  }));
  const selectBankData = banks.map((bank) => {
    return {
      label: `${bank.CODE} - ${bank.NAME}`,
      value: `${bank.CODE} - ${bank.NAME}`,
    };
  });
  function amount() {
    if (methodPage === "venezuela" || methodPage === "mercantil") {
      const mount = ticketCount ? ticketCount * 180 : undefined;
      return `${mount}.00 bss`;
    } else {
      return `${ticketCount}$`;
    }
  }
  // Configuración del formulario
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      PhoneCode: "",
      NumberPhone: "",
      id: "",
      NumberId: "",
      bank: "",
      reference: "",
      file: null,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      name: (value) => (value ? null : "Nombre requerido"),
      PhoneCode: (value) => (value ? null : "Código requerido"),
      NumberPhone: (value) => (value ? null : "Teléfono requerido"),
      id: (value) => (value ? null : "requerido"),
      NumberId: (value) => (value ? null : "Cédula requerida"),
      bank: (value) => (value ? null : "Banco requerido"),
      reference: (value) => (value ? null : "Referencia requerida"),
    },
  });
  const cloudinaryFilesubmit = async (): Promise<string | undefined> => {
    if (!file) {
      alert("Por favor, selecciona un comprobante.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        return data.url;
      } else {
        alert("Error al subir la imagen. Por favor, inténtalo de nuevo.");
        return;
      }
    } catch (error) {
      console.error("Error al subir a Cloudinary:", error);
      alert("Ocurrió un error de red al subir la imagen.");
      return;
    }
  };

  const supabaseSubmit = async (
    values: typeof form.values,
    imageUrl: string,
  ): Promise<Response> => {
    if (!(methodPage === "venezuela" || methodPage === "mercantil")) {
      values.bank = "Moneda extranjera";
    }
    const formdata = new FormData();
    formdata.append("email", values.email);
    formdata.append("name", values.name);
    formdata.append("PhoneCode", values.PhoneCode);
    formdata.append("NumberPhone", values.NumberPhone);
    formdata.append("id", values.id);
    formdata.append("NumberId", values.NumberId);
    formdata.append("bank", values.bank);
    formdata.append("reference", values.reference);
    formdata.append("fileUrl", imageUrl);
    formdata.append("method_pay", methodPage || "");
    formdata.append("ticketCount", ticketCount ? ticketCount.toString() : "0");
    formdata.append("amount", amount());

    const response = await fetch("api/supabase/post", {
      method: "POST",
      body: formdata,
    });
    return response;
  };

  return (
    <Card radius="md" withBorder mt="md">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const imageUrl = await cloudinaryFilesubmit();
            console.log("URL de la imagen:", imageUrl);
            if (imageUrl) {
              const responseSupabase = await supabaseSubmit(values, imageUrl);

              if (responseSupabase.ok) {
                console.log("Respuesta de Supabase:", responseSupabase);
                alert("¡Formulario enviado con éxito!");
              } else {
                const errorData = await responseSupabase.json();
                console.error("Error de Supabase:", errorData);
                alert(
                  `Error al guardar los datos: ${
                    errorData.error || "Inténtalo de nuevo."
                  }`,
                );
              }
            }
          } catch (error) {
            console.error("Error en el proceso de envío:", error);
            alert(
              "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
            );
          }
        })}
      >
        <SimpleGrid spacing="lg">
          <TextInput
            withAsterisk
            label="Email"
            placeholder="tucorreo@gmail.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Group>
            <Select
              withAsterisk
              label="Cédula"
              placeholder=""
              key={form.key("id")}
              {...form.getInputProps("id")}
              data={selectId}
              w={70}
              nothingFoundMessage="No hay resultados..."
            />
            <NumberInput
              rightSection={<div />}
              label=" "
              placeholder="Cédula"
              minLength={7}
              maxLength={8}
              key={form.key("NumberId")}
              {...form.getInputProps("NumberId")}
              allowDecimal={false}
              allowLeadingZeros={false}
              allowNegative={false}
              style={{ flex: 1 }}
            />
          </Group>
          <TextInput
            withAsterisk
            label="Nombre completo"
            placeholder="Pedro Perez"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <Group>
            <Select
              withAsterisk
              label="Teléfono"
              placeholder=""
              key={form.key("PhoneCode")}
              {...form.getInputProps("PhoneCode")}
              data={selectPhoneCode}
              w={110}
              nothingFoundMessage="No hay resultados..."
            />
            <NumberInput
              label=" "
              rightSection={<div />}
              placeholder="Teléfono"
              minLength={7}
              maxLength={10}
              allowDecimal={false}
              key={form.key("NumberPhone")}
              {...form.getInputProps("NumberPhone")}
              allowLeadingZeros={true}
              allowNegative={false}
              style={{ flex: 1 }}
            />
          </Group>
          {(methodPage === "venezuela" || methodPage === "mercantil") && (
            <Select
              withAsterisk
              label="Banco"
              placeholder="Selecciona un banco"
              key={form.key("bank")}
              {...form.getInputProps("bank")}
              data={selectBankData}
              searchable
              clearable
              nothingFoundMessage="No hay resultados..."
            />
          )}
          <NumberInput
            withAsterisk
            label="Referencia"
            rightSection={<div />}
            placeholder="Ultimo 6 Digitos"
            key={form.key("reference")}
            {...form.getInputProps("reference")}
            minLength={4}
            maxLength={8}
            allowDecimal={false}
            allowNegative={false}
            trimLeadingZeroesOnBlur={false}
          />

          <FileInput
            label="Comprobante"
            clearable
            withAsterisk
            accept="image/png,image/jpeg"
            key={form.key("file")}
            {...form.getInputProps("file")}
            placeholder="Ingresa el Comprobante de Pago"
            value={file}
            onChange={setFile}
          />
          <Button type="submit">enviar</Button>
        </SimpleGrid>
      </form>
    </Card>
  );
}
