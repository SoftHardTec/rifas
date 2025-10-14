import {
  Badge,
  Group,
  Container,
  Paper,
  Text,
  Title,
  Image,
} from "@mantine/core";
import NextImage from "next/image";

interface PurchaseDataProps {
  data: {
    userData: {
      name: string;
      email: string;
    };
    tickets: number[];
  };
}

export default function PurchaseData({ data }: PurchaseDataProps) {
  if (!data) {
    return null;
  }
  console.log("PurchaseData received data:", data);
  return (
    <Paper shadow="md" p="xl" mt="xl" withBorder>
      <Title order={2} ta="center" c="teal">
        ¡Gracias por tu compra, {data.userData.name}!
      </Title>

      <Text ta="center" mt="lg" fw={500}>
        Tus boletos asignados son:
      </Text>
      <Group justify="center" mt="sm" mb="lg" gap="xs">
        {data.tickets.map((ticket) => (
          <Badge key={ticket} variant="filled" size="lg" radius="sm">
            {ticket.toString().padStart(4, "0")}
          </Badge>
        ))}
      </Group>
      <Text ta="center" mt="sm" c="dimmed">
        Estas participando para ganar la rifa con la Pampara.
      </Text>
      <Text ta="center" mt="sm" c="dimmed">
        Para la fecha (en espera)
      </Text>
      <Container w={400} h={400} mt="md">
        <Image
          component={NextImage}
          src={"/Gana.jpeg"}
          alt="La Pampara"
          width={400}
          height={400}
        />
      </Container>
      <Text ta="center" mt={50} c="dimmed">
        En unos minutos se enviara la confirmación a tu correo:{" "}
        {data.userData.email}
      </Text>
    </Paper>
  );
}
