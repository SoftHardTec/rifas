"use client";

import { Alert, Group, Progress, Stack, Text } from "@mantine/core";
import { useEffect, useState } from "react";

export default function BarProgressTickets() {
  const [soldTickets, setSoldTickets] = useState(0);
  const totalTickets = 10000; // O el número total de boletos de tu rifa

  useEffect(() => {
    async function fetchSoldTickets() {
      try {
        const res = await fetch("/api/supabase/getTickets", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("La respuesta de la red no fue correcta");
        }

        const { count, error } = await res.json();

        if (error) {
          throw error;
        }

        if (typeof count === "number") {
          setSoldTickets(count);
        }
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    }

    // Ejecutar inmediatamente
    fetchSoldTickets();

    // Actualizar cada 5 segundos
    const interval = setInterval(fetchSoldTickets, 5000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(interval);
  }, []);

  const progressPercentage = (soldTickets / totalTickets) * 100;
  const progressPercentageInt = parseFloat(progressPercentage.toFixed(2));
  const remainingPercentage = 100 - progressPercentageInt;
  const availableTickets = totalTickets - soldTickets;
  const showAvailableTickets = remainingPercentage <= 0.10;

  return (
    <Stack gap="xs" align="center">
      <Group justify="center" mb="md">
        <Progress
          value={progressPercentage}
          size="xl"
          radius="xl"
          mt="md"
          w={500}
          h={25}
          animated
          variant="alertText"
          color="rgba(230, 0, 194)"
        />
        <Text ta="center" fz="md" fw={700}>
          QUEDAN {progressPercentageInt}% {showAvailableTickets && `/${availableTickets}TICKETS ` } 
        </Text>
      </Group>
    </Stack>
  );
}
