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
      <Card
        id="verificador"
        h={280}
        w={400}
        shadow="xl"
        padding="lg"
        radius="md"
        withBorder
      >
        <Group justify="center" align="center">
          <Title mb="xs" order={2} fw={900} mt={40}>
            Verifica tus tickets
          </Title>

          <form
            onSubmit={form.onSubmit((value) => {
              if (onSubmit) onSubmit(value.idCard);
              form.reset();
            })}
          >
            <NumberInput
              minLength={7}
              maxLength={12}
              w={250}
              key={form.key("idCard")}
              {...form.getInputProps("idCard")}
              placeholder="Ingresa tu número de cédula"
              rightSection={<div></div>}
              styles={{ input: { textAlign: "center" } }}
            />
            <Group justify="center" mb={20}>
              <Button
                color="rgb(230, 0, 126)"
                type="submit"
                mt="xl"
                size="md"
                loading={isLoading}
              >
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
