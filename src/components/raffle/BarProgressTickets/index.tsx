"use client";

import { Group, Progress, Text } from "@mantine/core";
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

    fetchSoldTickets();
  }, []); // El array vacío asegura que se ejecute solo una vez.

  const progressPercentage = (soldTickets / totalTickets) * 100;
  const progressPercentageInt = parseInt(progressPercentage.toFixed(0), 10);

  return (
    <>
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
          QUEDAN {progressPercentageInt}%
        </Text>
      </Group>
    </>
  );
}
