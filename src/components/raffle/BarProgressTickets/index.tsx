"use client";

import { Progress, Flex, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// Define el tipo para el payload de la suscripción
type TicketPayload = {
  new: {
    id: number;
    // Agrega otros campos de ticket si es necesario
  };
};

export default function BarProgressTickets() {
  const [soldTickets, setSoldTickets] = useState(0);
  const totalTickets = 10000;

  useEffect(() => {
    async function fetchSoldTickets() {
      try {
        const { count, error } = await supabase
          .from("tickets")
          .select("*", { count: "exact", head: true });
        if (error) {
          throw error;
        }
        if (typeof count === "number") {
          setSoldTickets(count);
        }
      } catch (error) {
        console.error("Error al obtener los boletos:", error);
      }
    }

    fetchSoldTickets();

    const channel = supabase
      .channel("tickets")
      .on<TicketPayload>(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "tickets" },
        () => {
          setSoldTickets((current) => current + 1);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const progressPercentage = (soldTickets / totalTickets) * 100;
  const remainingPercentage = 100 - progressPercentage;
  const remainingPercentageInt = parseFloat(remainingPercentage.toFixed(2));
  const availableTickets = totalTickets - soldTickets;

  return (
    <Flex
      direction="column"
      gap="xs"
      align="center"
      w="100%"
      maw="20rem"
      mx="auto"
    >
      <Progress
        value={progressPercentage}
        size="xl"
        radius="xl"
        mt="md"
        w="100%"
        h={25}
        animated
        variant="alertText"
        color="rgba(230, 0, 194)"
      />
      <Text ta="center" fz="md" fw={700}>
        {availableTickets <= 20
          ? `QUEDAN ${availableTickets} TICKETS`
          : `QUEDAN ${remainingPercentageInt}% `}
      </Text>
    </Flex>
  );
}
