"use client";

import {
  Card,
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  Group,
  Button,
} from "@mantine/core";
import ImageCarousel from "../Carousel";
import TicketSelector from "../TicketSelector";
import Conditions from "../Conditions";
import InfoRaffle from "../InfoRaffle";
import UserData from "../UserData";
import DataPage from "../DataPage";
import TicketChecker from "../TicketChecker";
import ButtonContact from "../ButtonContact";
import { useState } from "react";

export function HomeRaffle() {
  const [ticketCount, setTicketCount] = useState<number | null>(2);
  const [methodPage, setMethodPage] = useState<string | null>("venezuela");
  return (
    <Container my="md" size="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        <Card radius="md" withBorder>
          <ImageCarousel />
        </Card>
        <Grid gutter="sm">
          <Grid.Col>
            <Skeleton radius="md" animate={false} visible={false}>
              <InfoRaffle />
              <Conditions />
            </Skeleton>
          </Grid.Col>
          <Grid.Col>
            <Skeleton mt={10} radius="md" animate={false} visible={false}>
              <TicketSelector onSelect={setTicketCount} />
            </Skeleton>
          </Grid.Col>
        </Grid>
      </SimpleGrid>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" mt="md">
        <Card radius="md" withBorder mt="md">
          <DataPage ticketCount={ticketCount} setMethodPage={setMethodPage} />
        </Card>
        <Grid gutter="md">
          <Grid.Col>
            <Skeleton radius="md" animate={false} visible={false}>
              <UserData ticketCount={ticketCount} methodPage={methodPage} />
            </Skeleton>
          </Grid.Col>
        </Grid>
      </SimpleGrid>

      <Group justify="center" mt="lg">
        <Button type="submit" size="lg">
          Confirmar
        </Button>
      </Group>
      <Group justify="center" mt={80}>
        <TicketChecker />
      </Group>
      <ButtonContact />
    </Container>
  );
}
