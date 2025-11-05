"use client";

import {
  Alert,
  Button,
  Text,
  Group,
  NumberInput,
  rem,
  SimpleGrid,
} from "@mantine/core";
import { useEffect } from "react";
import { useCounter } from "@mantine/hooks";
import {
  IconTicket,
  IconArrowBigUpFilled,
  IconArrowBigDown,
} from "@tabler/icons-react";
import HandleError from "@/utils/HandleError";
import { useState } from "react";

interface TicketSelectorProps {
  onSelect?: (tickets: number) => void;
  methodPage?: string | null;
}
export default function TicketSelector({
  onSelect,
  methodPage,
}: TicketSelectorProps) {
  const iconTicket = (
    <IconTicket style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
  );
  const [errorInfo, setErrorInfo] = useState<{
    opened: boolean;
    title: string;
  }>({ opened: false, title: "" });

  const MIN_TICKETS = 2;
  const MIN_TICKETS_DOLLAR = 6;
  const MAX_TICKETS = 50;
  const ticketAmounts = [2, 6, 10, 20, 30, 50];

  const [count, handlers] = useCounter(MIN_TICKETS, {
    min: MIN_TICKETS,
    max: MAX_TICKETS,
  });

  useEffect(() => {
    if (onSelect) {
      onSelect(count);
    }

    if (methodPage !== "Mercantil" && count < MIN_TICKETS_DOLLAR) {
      setErrorInfo({
        opened: true,
        title: `La cantidad mínima para ${methodPage} es de ${MIN_TICKETS_DOLLAR} tickets.`,
      });
      handlers.set(MIN_TICKETS_DOLLAR);
    }
  }, [count, onSelect, methodPage]);

  return (
    <>
      <HandleError
        opened={errorInfo.opened}
        onClose={() => setErrorInfo({ ...errorInfo, opened: false })}
        title={errorInfo.title}
      />
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
