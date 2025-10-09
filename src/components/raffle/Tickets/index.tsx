import { useEffect, useState } from "react";
import { Card, Text, List } from "@mantine/core";

interface Ticket {
  tickets: string; // o number, según tu base de datos
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
}

export default function Tickets({ userId }: TicketsProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;
    async function fetchId() {
      const formData = new FormData();
      formData.append("idCard", userId ?? "");
      const res = await fetch("api/supabase/get", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setUsers(Array.isArray(data.data) ? data.data : []);
      setSearched(true);
      setLoading(false);
    }

    setLoading(true);
    setSearched(false);
    fetchId();
  }, [userId]);

  if (!userId) return null;

  if (searched && users.length === 0) {
    return <Card>No se encontraron datos para este usuario.</Card>;
  }

  if (users.length > 0) {
    return (
      <>
        {users.map((user) => (
          <Card key={user.id_card} radius="md" withBorder mt="md">
            <Text>Nombre: {user.name}</Text>
            <Text>
              Pago validado:{" "}
              {user.pay_data && user.pay_data.length > 0
                ? user.pay_data[0].validated
                  ? "Confirmado"
                  : "Pendiente"
                : "No hay datos de pago"}
            </Text>
            <Text>Tickets:</Text>
            <List size="sm" spacing="xs">
              {user.tickets && user.tickets.length > 0 ? (
                user.tickets.map((t, i) => (
                  <List.Item key={i}>{t.tickets}</List.Item>
                ))
              ) : (
                <List.Item>No tiene tickets asignados</List.Item>
              )}
            </List>
          </Card>
        ))}
      </>
    );
  }
}
