"use client";

import { Card, Title, NumberInput, Text, Button, Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

interface TicketCheckerProps {
  onSubmit?: (idCard: string) => void;
  isLoading: boolean;
}

export default function TicketChecker({
  onSubmit,
  isLoading,
}: TicketCheckerProps) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      idCard: " ",
    },
    validate: {
      idCard: (value) =>
        !value
          ? "El campo no puede estar vacío"
          : value.length < 5
            ? "El campo debe tener al menos 5 caracteres"
            : null,
    },
  });

  return (
    <>
      <Card h={400} w={400} shadow="xl" padding="lg" radius="md" withBorder>
        <Group justify="center" align="center" h={"100%"}>
          <Title order={2} fw={900} mb="sm" mt={40}>
            Verifica tus Boletos
          </Title>

          <form
            onSubmit={form.onSubmit((value) => {
              if (onSubmit) onSubmit(value.idCard);
              form.reset();
            })}
          >
            <NumberInput
              minLength={7}
              maxLength={9}
              w={250}
              key={form.key("idCard")}
              {...form.getInputProps("idCard")}
              rightSection={<div></div>}
            />
            <Text mt="md" size="sm" c="dimmed">
              Ingresa tu numero de cedula
            </Text>
            <Group justify="center" mb={20}>
              <Button type="submit" mt="xl" size="md" loading={isLoading}>
                <IconSearch size={20} />
                Verificar
              </Button>
            </Group>
          </form>
        </Group>
      </Card>
    </>
  );
}
