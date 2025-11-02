import { useEffect, useState } from "react";
import {
  Card,
  Text,
  Badge,
  Group,
  Stack,
  Title,
  Flex,
  Image,
} from "@mantine/core";
import NextImage from "next/image";

interface Ticket {
  tickets: string;
}

interface PayData {
  validated?: boolean;
}

interface User {
  name: string;
  email: string;
  id_card: string;
  tickets: Ticket[];
  pay_data: PayData[];
}

interface TicketsProps {
  userId: string | null;
  onSubmittingChange: (isSubmitting: boolean) => void;
}

const ValidatedPurchaseCard = ({ user }: { user: User }) => (
  <Card key={user.id_card} radius="lg" withBorder mt="md">
    <Stack justify="center" align="center" gap="xs">
      <Title mt={20} ta="center" order={3}>
        Felicidades {user.name}
      </Title>
      <Title order={3}>¡Ya estas participando!</Title>

      <Image
        height={2000}
        width={2000}
        component={NextImage}
        src={"/flyer.jpg"}
        alt="JuegacnNosotros"
        p={10}
      />
      <Text fz={15} ta="center" span fw={600}>
        Tu(s) pago(s) fuerón verificados con éxito
      </Text>
      <Text ta="center" fw={600}>
        ¡Mucha Suerte!
      </Text>
      <Title order={3} my={20} ta="center">
        Tickets Asignados
      </Title>
      <Group mb={15} justify="center" gap="xs">
        {user.tickets.map((ticket) => (
          <Badge
            key={ticket.tickets}
            variant="filled"
            color="#FFD4EC"
            size="xl"
            radius="sm"
            p="xs"
            style={{
              border: "1px solid #c41d7f",
              height: "35px",
              width: "65px",
            }}
          >
            <Text fw={700} c="#c41d7f" fz="sm">
              {String(ticket.tickets).padStart(4, "0")}
            </Text>
          </Badge>
        ))}
      </Group>
    </Stack>
  </Card>
);

const PendingPurchaseCard = ({ user }: { user: User }) => (
  <Card key={user.id_card} radius="lg" withBorder mt="md">
    <Stack my={20} align="center" gap="xs">
      <Title ta="center" order={3}>
        Hola {user.name} aun estamos verificando tu(s) pago(s)
      </Title>
      <Text ta="center" fw={600} size="sm" mt="xs">
        Tus boletos serán asignados y enviados a tu correo{" "}
        <strong>({user.email})</strong> una vez que el pago sea confirmado.
      </Text>
    </Stack>
  </Card>
);

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

  if (!userId || !users) return null;

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
        {users.map((user) => {
          const isValidated =
            user.pay_data.length > 0 && user.pay_data.every((p) => p.validated);

          if (isValidated) {
            return <ValidatedPurchaseCard key={user.id_card} user={user} />;
          } else {
            return <PendingPurchaseCard key={user.id_card} user={user} />;
          }
        })}
      </Stack>
    );
  }
}
