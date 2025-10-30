import { Card, Title, Image, Text, Group, Flex } from "@mantine/core";
import NextImage from "next/image";

export default function InfoRaffle() {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          component={NextImage}
          src={"/flyer.jpg"}
          alt="Rifa principal"
          height={500}
          width={500}
        />
      </Card.Section>
      <Flex justify="center" direction="column" mt="md" mb="xs" gap={10}>
        <Group justify="center" mb="md" mt="md">
          <Title order={2}>Detalles del Sorteo</Title>
        </Group>
        <Text ta="left" fw={600}>
          🎁Premio 2000$ en efectivo🎁.
        </Text>
        <Text fw={600}>
          Fecha se lanzará al alcanzar el 80% de los tickets‼️.
        </Text>
        <Text fw={600}>
          Los resultados se dará a las 10pm por Loteria SUPER GANA.
        </Text>
        <Text fw={600}>
          La verificación de los tickets la revisas abajo colocando tu n° de
          cedula con el que te registraste, el cuál podrás ver 24 hrs después de
          tu compra.{" "}
        </Text>
        <Text fw={600}>Compra mínima 2 tickets ‼️.</Text>
        <Text fw={600}>🍀 Muchas Suerte 🍀.</Text>
      </Flex>
    </Card>
  );
}
