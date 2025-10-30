import {
  Card,
  Title,
  Text,
  Image,
  Badge,
  Group,
  Flex,
  Alert,
} from "@mantine/core";
import NextImage from "next/image";
import { IconCalendarMonth, IconAlertCircle } from "@tabler/icons-react";

interface EmailTemplateProps {
  name: string;
  tickets: string;
  ticketCount: number;
  cardId: string;
  amount: number;
  currency: string;
}

// El nombre del componente debe ser "Template" (capitalizado) para seguir las convenciones de React
export default function Template({
  name,
  tickets,
  ticketCount,
  cardId,
  amount,
  currency,
}: EmailTemplateProps) {
  const iconAlert = <IconAlertCircle size={70} color="magenta" />; // Considera mover esto fuera del componente si no depende de props
  const ticketNumbersArray = tickets ? tickets.split(", ") : []; // Divide la cadena de tickets en un array

  return (
    <Card color="blue">
      <Title my="md" order={2} ta="center">
        Ya estas Participando
      </Title>
      <Image
        component={NextImage}
        src={"/flyer.jpg"}
        width={400}
        height={400}
        alt="Image"
      />
      <Badge
        color="white"
        h={25}
        fullWidth
        p="sm"
        fw={500}
        radius="sm"
        variant="default"
        my="md"
      >
        <Flex align="center" gap={5}>
          <IconCalendarMonth color="white" size={30} />
          El sorteo se realizara al cumplir el 80%
        </Flex>
      </Badge>
      <Text size="sm">Nombre: {name}</Text>
      <Text size="sm">Cedula: {cardId}</Text>
      <Alert
        variant="outline"
        color="magenta"
        my="md"
        radius="md"
        icon={iconAlert}
      >
        <Text c="gray">
          Guarda este comprobante y te contactaremos el dia del sorteo si eres
          uno de los afortunados.
        </Text>
      </Alert>
      <Title ta="center" my="md" order={4}>
        Boletos Comprados
      </Title>
      {ticketNumbersArray.length > 0 ? (
        <Group justify="center" align="center" gap="xs">
          {ticketNumbersArray.map((ticketNumber) => (
            <Badge key={ticketNumber} variant="light" size="lg" radius="md">
              {ticketNumber}
            </Badge>
          ))}
        </Group>
      ) : (
        <Text ta="center" size="sm" c="dimmed">
          No hay boletos asignados.
        </Text>
      )}
    </Card>
  );
}
