"use client";

import { Progress, Text } from "@mantine/core";
import { useEffect, useState } from "react";
export default function BarProgressTickets() {
  const [soldTickets, setSoldTickets] = useState(0);
  const totalTickets = 10000; // O el número total de boletos de tu rifa

  useEffect(() => {
    // Hacemos la consulta a la API cuando el componente se monta.
    // No enviamos ningún `idCard` para que la API nos devuelva
    // la información de todos los boletos.
    async function fetchSoldTickets() {
      try {
        // Hacemos una petición POST a nuestra API, pero sin cuerpo (body).
        // Esto le indicará a la API que queremos todos los boletos.
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

  return (
    <>
      <Progress
        value={progressPercentage}
        size="xl"
        radius="xl"
        mt="md"
        animated
      />
      <Text ta="center" mt={5}>
        {soldTickets} de {totalTickets} boletos vendidos
      </Text>
    </>
  );
}
