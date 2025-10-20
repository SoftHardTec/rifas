"use client";

import {
  Card,
  NumberInput,
  SimpleGrid,
  TextInput,
  Select,
  Group,
  FileInput,
} from "@mantine/core";
import { forwardRef, useImperativeHandle } from "react";
import { countries } from "@/utils/PhoneCode";
import { optionId } from "@/utils/OptionId";
import { banks } from "@/utils/bankData";
import { useForm } from "@mantine/form";
import { useState } from "react";
import CloudinaryFileSubmit from "./Cloudinarysubmit";
import supabaseSubmit from "./SupabaseSubmit";
import HandleError from "@/utils/HandleError";
import Confirmation from "@/utils/Confirmation";

export interface UserDataRef {
  submit: () => void;
}

interface UserDataProps {
  methodPage: string | null;
  ticketCount: number | null;
  onTicketPurchase: (purchaseData: any) => void;
  onSubmittingChange: (isSubmitting: boolean) => void;
}

const UserData = forwardRef<UserDataRef, UserDataProps>(function UserData(
  {
    methodPage,
    ticketCount,
    onTicketPurchase,
    onSubmittingChange,
  }: UserDataProps,
  ref,
) {
  const [errorInfo, setErrorInfo] = useState<{
    opened: boolean;
    title: string;
    text: string;
  }>({ opened: false, title: "", text: "" });

  const [confirmationInfo, setConfirmationInfo] = useState({
    opened: false,
  });

  const selectPhoneCode = countries.map((PhoneCode) => ({
    label: `${PhoneCode.flagEmoji} ${PhoneCode.phoneCode}`,
    value: PhoneCode.phoneCode,
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
    if (!ticketCount || ticketCount === 0) {
      throw new Error("La cantidad de boletos no puede ser cero.");
    }

    if (methodPage === "Mercantil") {
      const mount = ticketCount * 180;
      return `${mount.toFixed(2)} bss`;
    } else {
      if (ticketCount < 6) {
        throw new Error(
          `La cantidad mínima para ${methodPage} es de 6 boletos.`,
        );
      }
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
      bank: (value) =>
        methodPage === "venezuela" || methodPage === "mercantil"
          ? value
            ? null
            : "Banco requerido"
          : null,
      reference: (value) => (value ? null : "Referencia requerida"),
      file: (value) => (value ? null : "Comprobante requerido"),
    },
  });

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const calculatedAmount = amount();

      onSubmittingChange(true);
      const imageUrl = await CloudinaryFileSubmit({ file: values.file });
      if (imageUrl) {
        const responseSupabase = await supabaseSubmit({
          values,
          imageUrl,
          methodPage,
          ticketCount,
          amount: calculatedAmount,
        });

        if (responseSupabase.ok) {
          const result = await responseSupabase.json();
          setConfirmationInfo({
            opened: true,
          });
          onTicketPurchase(result.data); // Pasamos los datos de la compra al padre
          form.reset();
        } else {
          const errorData = await responseSupabase.json();
          throw new Error(errorData.error || ".");
        }
      }
    } catch (error) {
      onSubmittingChange(false);
      const errorMessage =
        error instanceof Error ? error.message : "Ocurrió un error inesperado.";
      console.error("Error en el proceso de envío:", errorMessage);
      setErrorInfo({
        opened: true,
        title: "ha ocurrido un error",
        text: errorMessage,
      });
    } finally {
      onSubmittingChange(false);
    }
  });

  useImperativeHandle(ref, () => ({
    submit: handleSubmit,
  }));

  return (
    <>
      <HandleError
        opened={errorInfo.opened}
        onClose={() => setErrorInfo({ ...errorInfo, opened: false })}
        title={errorInfo.title}
        text={errorInfo.text}
      />
      <Confirmation
        opened={confirmationInfo.opened}
        onClose={() =>
          setConfirmationInfo({ ...confirmationInfo, opened: false })
        }
      />

      <Card radius="md" withBorder mt="md">
        <form onSubmit={handleSubmit}>
          <SimpleGrid mt="xs" mb="xs" spacing="lg">
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
                maxLength={11}
                allowDecimal={false}
                key={form.key("NumberPhone")}
                {...form.getInputProps("NumberPhone")}
                allowLeadingZeros={true}
                allowNegative={false}
                style={{ flex: 1 }}
              />
            </Group>
            {methodPage === "Mercantil" && (
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
            />
          </SimpleGrid>
        </form>
      </Card>
    </>
  );
});

export default UserData;
