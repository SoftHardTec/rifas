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
          Premio <strong>2000$</strong> en efectivo🎁.
        </Text>
        <Text fw={600}>
          La fecha se lanzará al alcanzar el <strong>80%</strong> de los tickets
          vendidos‼️.
        </Text>
        <Text fw={600}>
          Los resultados se darán por la lotería <strong>SUPER GANA.</strong>
        </Text>
        <Text fw={600}>
          Compra mínima <strong>2 tickets</strong> ‼️.
        </Text>
        <Text ta="center" fw={600}>
          🍀<strong>Mucha Suerte</strong>🍀.
        </Text>
      </Flex>
    </Card>
  );
}
