"use client";
import { Table, Title, Card } from "@mantine/core";
import { supabase } from "@/app/api/supabase/client";
import { useState, useEffect, useMemo } from "react";

interface RankingData {
  user_tickets: number;
  user_data: {
    name: string;
  } | null;
}

export default function RankingBuyer() {
  const [dataRanking, setDataRanking] = useState<RankingData[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from("user_tickets")
          .select("user_tickets, user_data(name)");

        if (error) {
          throw new Error(error.message);
        }
        if (data) {
          setDataRanking(data as unknown as RankingData[]);
        }
      } catch (error) {
        console.error("Error fetching ranking data:", error);
      }
    }
    fetchData();
  }, []);

  // Agrupar los tickets por comprador y sumar los tickets
  const groupedTickets = useMemo(() => {
    const grouped: { [key: string]: number } = {};
    dataRanking.forEach((item) => {
      const userName = item.user_data?.name || "Unknown";
      grouped[userName] = (grouped[userName] || 0) + item.user_tickets;
    });

    return Object.entries(grouped)
      .map(([name, totalTickets]) => ({
        name,
        totalTickets,
      }))
      .sort((a, b) => b.totalTickets - a.totalTickets);
  }, [dataRanking]);

  const rows = groupedTickets.map((item, index) => (
    <Table.Tr key={index}>
      <Table.Th ta="center">{index + 1}</Table.Th>
      <Table.Td>{item.name || "Usuario no disponible"}</Table.Td>
      <Table.Td ta="center">{item.totalTickets}</Table.Td>
    </Table.Tr>
  ));

  const topRows = rows.slice(0, 5);
  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <Title order={4} ta="center" mb="md">
        Ranking de Compradores
      </Title>
      <Table.ScrollContainer minWidth={300} maxHeight={400}>
        <Table
          verticalSpacing="sm"
          highlightOnHover
          withColumnBorders
          withRowBorders={false}
        >
          <Table.Thead>
            <Table.Tr>
              <Table.Th ta="center">Pos.</Table.Th>
              <Table.Th>Nombre</Table.Th>
              <Table.Th ta="center">Tickets</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{topRows}</Table.Tbody>
        </Table>
      </Table.ScrollContainer>
    </Card>
  );
}
