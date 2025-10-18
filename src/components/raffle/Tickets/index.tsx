import { useEffect, useState } from "react";
import { Card, Text, Badge, Group, Stack, Title, Flex } from "@mantine/core";

interface Ticket {
  tickets: number;
}

interface PayData {
  validated?: boolean;
  bank?: string;
  voucher?: string;
  reference?: number;
  method_pay?: string;
}

interface User {
  name: string;
  email: string;
  id_card: number;
  phone: number;
  tickets: Ticket[];
  pay_data?: PayData[];
}

interface TicketsProps {
  userId: string | null;
  onSubmittingChange: (isSubmitting: boolean) => void;
}

export default function Tickets({ userId, onSubmittingChange }: TicketsProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!userId) {
      setUsers([]);
      setSearched(false);
      return;
    }
    async function fetchId() {
      const abortController = new AbortController();
      onSubmittingChange(true);
      setSearched(false);
      try {
        const formData = new FormData();
        formData.append("idCard", userId ?? "");
        const res = await fetch("api/supabase/get", {
          method: "POST",
          body: formData,
          signal: abortController.signal, // Asociar el controlador
        });
        const data = await res.json();
        setUsers(Array.isArray(data.data) ? data.data : []);
      } catch (error: any) {
        if (error.name !== "AbortError") {
          console.error("Error fetching tickets:", error);
          setUsers([]); // Limpiar en caso de error
        }
      } finally {
        setSearched(true);
        onSubmittingChange(false);
      }
    }

    fetchId();
  }, [userId, onSubmittingChange]);

  if (!userId) return null;

  if (searched && users.length === 0) {
    return (
      <Card h={300} mt={20}>
        <Flex
          justify="center"
          align="center"
          h={"100%"}
          direction="column"
          gap="md"
        >
          <Title order={2} ta="center" c="dimmed">
            No se encontraron Tickets.
          </Title>
          <Text ta="center" c="dimmed">
            Que esperas para ganar con la Pampara! Compra tus boletos ya.
          </Text>
        </Flex>
      </Card>
    );
  }

  if (users.length > 0) {
    return (
      <Stack mt={20}>
        {users.map((user) => (
          <Card key={user.id_card} radius="md" withBorder mt="md">
            <Stack gap="xs">
              <Text>
                <Text span fw={700}>
                  Nombre:
                </Text>{" "}
                {user.name}
              </Text>
              <Text>
                <Text span fw={700}>
                  Estado del Pago:
                </Text>{" "}
                {user.pay_data && user.pay_data.length > 0 ? (
                  <Badge
                    color={user.pay_data[0].validated ? "green" : "orange"}
                  >
                    {user.pay_data[0].validated ? "Confirmado" : "Pendiente"}
                  </Badge>
                ) : (
                  "No hay datos de pago"
                )}
              </Text>
              <Text fw={700}>Boletos Asignados:</Text>
              {user.tickets && user.tickets.length > 0 ? (
                <Group gap="xs">
                  {user.tickets.map((ticket) => (
                    <Badge
                      key={ticket.tickets}
                      variant="light"
                      size="lg"
                      radius="sm"
                    >
                      {ticket.tickets.toString().padStart(4, "0")}
                    </Badge>
                  ))}
                </Group>
              ) : (
                <Text size="sm" c="dimmed">
                  No hay boletos asignados.
                </Text>
              )}
            </Stack>
          </Card>
        ))}
      </Stack>
    );
  }
}
