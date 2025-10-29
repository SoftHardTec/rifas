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
      <Card h={200} mt="xl" radius="lg">
        <Flex
          justify="center"
          align="center"
          h={"100%"}
          direction="column"
          gap="md"
        >
          <Title order={4} ta="center" c="dimmed">
            No se encontraron tickets vinculados a esta cedula.
          </Title>
        </Flex>
      </Card>
    );
  }

  if (users.length > 0) {
    return (
      <Stack mt={20}>
        {users.map((user) => (
          <Card key={user.id_card} radius="lg" withBorder mt="md">
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
                {(() => {
                  if (user.pay_data && user.pay_data.length > 0) {
                    const allValidated = user.pay_data.every(
                      (p) => p.validated,
                    );
                    return (
                      <Badge
                        radius="sm"
                        color={allValidated ? "green" : "orange"}
                      >
                        {allValidated ? "Confirmado" : "Pendiente"}
                      </Badge>
                    );
                  }
                  return "No hay datos de pago";
                })()}
              </Text>
              <Text fw={700}>Boletos Asignados:</Text>
              {user.tickets && user.tickets.length > 0 ? (
                <Group gap="xs">
                  {user.tickets.map((ticket) => (
                    <Badge
                      key={ticket.tickets}
                      variant="light"
                      size="lg"
                      radius="md"
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
