"use client";

import { Alert, Button, Group, NumberInput, rem } from "@mantine/core";
import { useEffect } from "react";
import { useCounter } from "@mantine/hooks";
import {
  IconTicket,
  IconArrowBigUpFilled,
  IconArrowBigDown,
} from "@tabler/icons-react";

interface TicketSelectorProps {
  onSelect?: (tickets: number) => void;
}
export default function TicketSelector({ onSelect }: TicketSelectorProps) {
  const iconTicket = (
    <IconTicket style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
  );
  const MIN_TICKETS = 2;
  const MAX_TICKETS = 100;

  const [count, handlers] = useCounter(MIN_TICKETS, {
    min: MIN_TICKETS,
    max: MAX_TICKETS,
  });

  useEffect(() => {
    if (onSelect) {
      onSelect(count);
    }
  }, [count, onSelect]);

  return (
    <>
      <Group preventGrowOverflow justify="center" gap="xs">
        <Button color="red" onClick={() => handlers.decrement()}>
          <IconArrowBigDown
            style={{ width: rem(20), height: rem(20) }}
            stroke={1.5}
          />
        </Button>
        <NumberInput
          rightSection={iconTicket}
          placeholder="Tickets"
          value={count}
          onChange={(value) => handlers.set(Number(value))}
          min={MIN_TICKETS}
          max={MAX_TICKETS}
          style={{ width: rem(75) }}
        />
        <Button color="green" onClick={() => handlers.increment()}>
          <IconArrowBigUpFilled
            style={{ width: rem(20), height: rem(20) }}
            stroke={1.5}
          />
        </Button>
      </Group>

      <Alert
        variant="light"
        color="orange"
        mt="md"
        className="text-center w-1/3 mx-auto p-1"
      >
        Minimo {MIN_TICKETS} ticket
      </Alert>
    </>
  );
}
