"use client";

import { useMemo } from "react";
import { Container, Title, Flex, ActionIcon, Image } from "@mantine/core";
import {
  Binance,
  Mercantil,
  Zelle,
  Yape,
  Nequi,
} from "../../../utils/MethodPage";
import NextImage from "next/image";

const banks = [
  {
    key: "Mercantil",
    img: "/Mercantil.png",
  },
  {
    key: "Yape",
    img: "/Yape.png",
  },
  {
    key: "Binance",
    img: "/Binance.png",
  },
  {
    key: "Nequi",
    img: "/Nequi.png",
  },
  {
    key: "Zelle",
    img: "/Zelle.png",
  },
];

interface DataPageProps {
  ticketCount: number | null;
  methodPage: string | null;
  setMethodPage: (value: string | null) => void;
}

export default function DataPage({
  ticketCount,
  methodPage,
  setMethodPage,
}: DataPageProps) {
  // Mapeamos las keys a los componentes para un renderizado dinámico
  const paymentComponents: { [key: string]: React.ComponentType<any> } =
    useMemo(
      () => ({
        Mercantil,
        Yape,
        Binance,
        Nequi,
        Zelle,
      }),
      [],
    );

  const ActiveComponent = methodPage ? paymentComponents[methodPage] : null;

  return (
    <>
      <Container>
        <Title order={3} mt="md" mb="xs" style={{ textAlign: "center" }}>
          Métodos de pago
        </Title>
        <Flex wrap="wrap" justify="center" mt="lg" gap="md" mb="lg">
          {banks.map((bank) => (
            <ActionIcon
              key={bank.key}
              onClick={() => setMethodPage(bank.key)}
              variant="transparent"
              size="2.5rem"
              radius="xl" // aria-label se obtiene de la key
              aria-label={bank.key}
              w="4rem"
              h="4rem"
              style={{
                opacity: methodPage === bank.key ? 1 : 0.6,
                transition: "opacity 1s ease",
              }}
            >
              <Image
                component={NextImage}
                src={bank.img}
                alt={bank.key}
                width={50}
                height={50}
                style={{ width: "auto", height: "auto" }}
              />
            </ActionIcon>
          ))}
        </Flex>
      </Container>
      {ActiveComponent && (
        <ActiveComponent key={methodPage} ticketCount={ticketCount} />
      )}
    </>
  );
}
