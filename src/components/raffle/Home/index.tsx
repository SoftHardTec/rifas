"use client";

import {
  Card,
  Container,
  Grid,
  SimpleGrid,
  Skeleton,
  Group,
  Button,
  Stack,
} from "@mantine/core";
import ImageCarousel from "../Carousel";
import TicketSelector from "../TicketSelector";
import Conditions from "../Conditions";
import InfoRaffle from "../InfoRaffle";
import UserData from "../UserData";
import PayData from "../PayData";
import TicketChecker from "../TicketChecker";
import ButtonContact from "../ButtonContact";
import Tickets from "../Tickets";
import BarProgressTickets from "../BarProgressTickets";
import { useState } from "react";
import { useRef } from "react";
import type { UserDataRef } from "../UserData";
import Loader from "@/components/ui/Loader";

export function HomeRaffle() {
  const [ticketCount, setTicketCount] = useState<number | null>(2);
  const [methodPage, setMethodPage] = useState<string | null>("Mercantil");
  const [consultUser, setConsultUser] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [isCheckingTickets, setIsCheckingTickets] = useState(false);
  const userDataRef = useRef<UserDataRef>(null);

  // Esta función se llamará cuando la compra termine (con éxito o error)
  const handleTicketPurchase = (data: any) => {
    setRefreshKey((prev) => prev + 1);
  };

  // El Loader se mostrará si cualquiera de las dos acciones está en curso
  const showLoader = isFormSubmitting || isCheckingTickets;

  return (
    <>
      {/* Renderizamos el Loader aquí y controlamos su visibilidad con el estado */}
      <Loader visible={showLoader} />

      <Container my="md" size="xl">
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          <Skeleton radius="md" animate={false} visible={false}>
            <InfoRaffle />
          </Skeleton>
          <Stack justify="center">
            <Skeleton radius="md" animate={false} visible={false}>
              <Card radius="md" shadow="md" padding="lg" withBorder>
                <BarProgressTickets />
                <TicketSelector
                  onSelect={setTicketCount}
                  methodPage={methodPage}
                />
              </Card>
            </Skeleton>
          </Stack>
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" mt="md">
          <Card radius="md" withBorder mt="md">
            <PayData
              ticketCount={ticketCount}
              methodPage={methodPage}
              setMethodPage={setMethodPage}
            />
          </Card>
          <Grid gutter="md">
            <Grid.Col>
              <Skeleton radius="md" animate={false} visible={false}>
                <UserData
                  ref={userDataRef}
                  ticketCount={ticketCount}
                  methodPage={methodPage}
                  onTicketPurchase={handleTicketPurchase}
                  onSubmittingChange={setIsFormSubmitting}
                />
              </Skeleton>
            </Grid.Col>
          </Grid>
        </SimpleGrid>

        <Group justify="center" mt="lg">
          <Button
            color="rgb(230, 0, 126)"
            type="button"
            size="lg"
            loading={isFormSubmitting} // <-- Usa el estado correcto
            onClick={() => {
              userDataRef.current?.submit();
            }}
          >
            Confirmar
          </Button>
        </Group>
        <Group justify="center" mt={80}>
          <TicketChecker
            isLoading={isCheckingTickets}
            onSubmit={setConsultUser}
          />
        </Group>
        <Tickets
          onSubmittingChange={setIsCheckingTickets}
          userId={consultUser}
        />
        <ButtonContact />
      </Container>
    </>
  );
}
