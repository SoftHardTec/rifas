"use client";

import { useState } from "react";
import { Container, Title, Flex, ActionIcon, Image } from "@mantine/core";
import {
  Venezuela,
  Zinli,
  Zelle,
  Binance,
  Mercantil,
} from "../../../utils/MethodPage";
import NextImage from "next/image";

const banks = [
  {
    key: "venezuela",
    label: "BDV",
    img: "/BDV.png",
    component: Venezuela,
  },
  {
    key: "mercantil",
    label: "Mercantil",
    img: "/Mercantil.png",
    component: Mercantil,
  },
  { key: "zinli", label: "Zinli", img: "/Zinli.png", component: Zinli },
  { key: "zelle", label: "Zelle", img: "/Zelle.png", component: Zelle },
  {
    key: "binance",
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
  const [selectedBank, setSelectedBank] = useState<string>("venezuela");

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
              radius="md"
              aria-label={bank.label}
            >
              <Image
                component={NextImage}
                src={bank.img}
                alt={bank.label}
                width={100}
                height={40}
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
