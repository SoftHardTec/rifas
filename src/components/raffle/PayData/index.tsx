"use client";

import { useState } from "react";
import { Container, Title, Flex, ActionIcon, Image } from "@mantine/core";
import { Zinli, Binance, Mercantil } from "../../../utils/MethodPage";
import NextImage from "next/image";

const banks = [
  {
    key: "Mercantil",
    label: "Mercantil",
    img: "/Mercantil.png",
    component: Mercantil,
  },
  { key: "Zinli", label: "Zinli", img: "/Zinli.png", component: Zinli },
  {
    key: "Binance",
    label: "Binance",
    img: "/Binance.png",
    component: Binance,
  },
];

interface DataPageProps {
  ticketCount: number | null;
  setMethodPage: (value: string | null) => void;
}

export default function DataPage({
  ticketCount,
  setMethodPage,
}: DataPageProps) {
  const [selectedBank, setSelectedBank] = useState<string>("Mercantil");

  return (
    <>
      <Container>
        <Title order={3} mt="md" mb="xs" style={{ textAlign: "center" }}>
          Metodos de pago
        </Title>
        <Flex justify="center" mt="lg" gap="lg" mb="lg">
          {banks.map((bank) => (
            <ActionIcon
              key={bank.key}
              onClick={() => {
                setSelectedBank(bank.key);
                setMethodPage(bank.key);
              }}
              variant="transparent"
              size="2.5rem"
              radius="xl"
              aria-label={bank.label}
              w={60}
              h={60}
            >
              <Image
                component={NextImage}
                src={bank.img}
                alt={bank.label}
                width={50}
                height={50}
                style={{ width: "auto", height: "auto" }}
              />
            </ActionIcon>
          ))}
        </Flex>
      </Container>
      {(() => {
        const selected = banks.find((b) => b.key === selectedBank);

        if (!selected) return null;
        const BankComponent = selected.component;
        return <BankComponent ticketCount={ticketCount ?? null} />;
      })()}
    </>
  );
}
