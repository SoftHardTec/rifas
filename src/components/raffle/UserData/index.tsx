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
import ModalPurchase from "@/components/raffle/ModalPurchase";

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
      const mount = ticketCount * 140;
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
      PhoneCode: countries[0].phoneCode,
      NumberPhone: "",
      id: selectId[0].value,
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
      NumberId: (value) =>
        String(value).length > 6 ? null : "Cédula requerida",
      bank: (value) =>
        methodPage === "Mercantil" ? (value ? null : "Banco requerido") : null,
      reference: (value) =>
        String(value).length > 5 ? null : "Referencia requerida",
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
          setConfirmationInfo({
            opened: true,
          });
          onTicketPurchase({}); // Ya no pasamos datos, solo notificamos el éxito
          form.reset();
        } else {
          const errorData = await responseSupabase.json();
          // Lanzamos el error que viene de la API para que sea capturado por el bloque catch.
          // Si no hay un mensaje de error específico, usamos uno genérico.
          const apiErrorMessage =
            errorData.error || "No se pudo completar la solicitud.";
          throw new Error(apiErrorMessage);
        }
      }
    } catch (error) {
      onSubmittingChange(false);
      const errorMessage =
        error instanceof Error ? error.message : "Ocurrió un error inesperado.";
      console.error("Error en el proceso de envío:", errorMessage);
      setErrorInfo({
        opened: true,
        title: "Ha ocurrido un error",
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
      <ModalPurchase
        opened={confirmationInfo.opened}
        close={() =>
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
                maxLength={12}
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
              placeholder="Nombre y Apellido"
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
                w={100}
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
              placeholder="Último 6 dígitos"
              key={form.key("reference")}
              {...form.getInputProps("reference")}
              minLength={6}
              maxLength={12}
              allowDecimal={false}
              allowNegative={false}
              trimLeadingZeroesOnBlur={false}
            />

            <FileInput
              label="Capture Bancario"
              clearable
              withAsterisk
              accept="image/png,image/jpeg"
              key={form.key("file")}
              {...form.getInputProps("file")}
              placeholder="Selecciona archivo"
            />
          </SimpleGrid>
        </form>
      </Card>
    </>
  );
});

export default UserData;
