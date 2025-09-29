"use client";

import { Card, Title, NumberInput, Text, Button, Group } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useForm } from "@mantine/form";

export default function TicketChecker() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      datos: "",
    },
    validate: {
      datos: (value) =>
        !value
          ? "Ingresa tu cedula o ticket"
          : value.length < 6
            ? "cedula"
            : "ticket",
    },
  });
  return (
    <Card h={400} w={400} shadow="xl" padding="lg" radius="md" withBorder>
      <Group justify="center" align="center" h={"100%"}>
        <Title order={2} fw={900} mb="sm" mt={40}>
          Verifica tus Boletos
        </Title>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <NumberInput w={250} rightSection={<div></div>} />
          <Text mt="md" size="sm" c="dimmed">
            Ingresa tu numero de cedula o #Boleto
          </Text>
          <Group justify="center" mb={20}>
            <Button type="submit" mt="xl" size="md">
              <IconSearch size={20} />
              Verificar
            </Button>
          </Group>
        </form>
      </Group>
    </Card>
  );
}
