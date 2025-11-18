"use client";

import {
  Alert,
  Button,
  Text,
  Group,
  NumberInput,
  rem,
  SimpleGrid,
  InputError,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { useCounter } from "@mantine/hooks";
import {
  IconTicket,
  IconArrowBigUpFilled,
  IconArrowBigDown,
} from "@tabler/icons-react";
import { methodPage as methodData } from "@/utils/MethodPage";
import HandleError from "@/utils/HandleError";
import { Interface } from "readline";
import { handler } from "next/dist/build/templates/app-page";

interface TicketSelectorProps {
  onSelect?: (tickets: number) => void;
  methodPage?: string | null;
}

export default function TicketSelector({
  onSelect,
  methodPage,
}: TicketSelectorProps) {
  const [errorInfo, setErrorInfo] = useState<{
    opened: boolean;
    title: string;
  }>({ opened: false, title: "" });

  const iconTicket = (
    <IconTicket style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
  );

  const MIN_TICKETS = 2;
  const MAX_TICKETS = 50;
  const ticketAmounts = [2, 6, 10, 20, 30, 50];

  const [count, handlers] = useCounter(MIN_TICKETS, {
    min: MIN_TICKETS,
    max: MAX_TICKETS,
  });

  // Efecto para notificar al componente padre cuando el contador cambia.
  useEffect(() => {
    if (onSelect) {
      onSelect(count);
    }
  }, [count, onSelect]);

  // Efecto unificado para validar, ajustar el contador y manejar el estado de error.
  useEffect(() => {
    const currentMethod = methodData.find((m) => m.key === methodPage);
    if (currentMethod) {
      handlers.set(currentMethod.minTickets);
    }
  }, [methodPage]);

  useEffect(() => {
    const currentMethod = methodData.find((m) => m.key === methodPage);
    if (currentMethod && count < currentMethod.minTickets) {
      setErrorInfo({
        opened: true,
        title: `La cantidad mínima para ${currentMethod.label} es de ${currentMethod.minTickets} tickets.`,
      });
      handlers.set(currentMethod.minTickets);
    }
  }, [count, methodPage, handlers]);

  return (
    <>
      <HandleError opened={errorInfo.opened} title={errorInfo.title} />
      <Group justify="center" gap={0}>
        <SimpleGrid cols={3} mt="md" mb="xl" spacing={10}>
          {ticketAmounts.map((amount) => (
            <Button
              key={amount}
              variant="default"
              size="md"
              radius={5}
              w={75}
              onClick={() => handlers.set(amount)}
            >
              {amount}
            </Button>
          ))}
        </SimpleGrid>
      </Group>

      <Group mb={20} preventGrowOverflow justify="center" gap="xs">
        <Button color="red" onClick={() => handlers.decrement()}>
          <IconArrowBigDown
            style={{ width: rem(20), height: rem(20) }}
            stroke={1.5}
          />
        </Button>
        <NumberInput
          variant="default"
          rightSection={iconTicket}
          placeholder="Tickets"
          value={count}
          onChange={(value) => handlers.set(Number(value))}
          readOnly
          step={1}
          min={MIN_TICKETS}
          max={MAX_TICKETS}
          styles={{
            input: {
              textAlign: "center",
              paddingRight: `var(--ni-right-section-width, ${rem(20)})`,
            },
          }}
          w={rem(75)}
        />
        <Button color="green" onClick={() => handlers.increment()}>
          <IconArrowBigUpFilled
            style={{ width: rem(20), height: rem(20) }}
            stroke={1.5}
          />
        </Button>
      </Group>
    </>
  );
}
