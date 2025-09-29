"use client";

import { useState } from "react";
import { TermsAndConditionsModal } from "@/utils/termsAndConditions";

import {
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import NextImage from "next/image";
import {
  ActionIcon,
  Anchor,
  Group,
  Text,
  Image,
  Title,
  SimpleGrid,
} from "@mantine/core";
import classes from "./FooterSocial.module.css";

const links = [
  { link: "@/utils/TermsAndConditionsModal", label: "Terminos y condiciones" },
];

export function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const items = links.map((link) =>
    link.label === "Terminos y condiciones" ? (
      <Anchor
        c="dimmed"
        key={link.label}
        lh={1}
        onClick={() => setShowTerms(true)}
        size="sm"
        style={{ cursor: "pointer" }}
      >
        {link.label}
      </Anchor>
    ) : (
      <Anchor
        c="dimmed"
        key={link.label}
        href={link.link}
        lh={1}
        onClick={(event) => event.preventDefault()}
        size="sm"
      >
        {link.label}
      </Anchor>
    ),
  );

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <ActionIcon
          size="lx"
          variant="transparent"
          radius="md"
          ml={{ base: 0, sm: 10 }}
        >
          <Image
            component={NextImage}
            src={"/logo.png"}
            width={100}
            height={40}
            alt="logo"
          />
        </ActionIcon>
        <Group justify="center" mt={{ base: 0, sm: 15 }} mb={10}>
          <Anchor
            href="https://supergana.com.ve/resultados.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ActionIcon size="lx" variant="transparent" radius="md">
              <Image
                component={NextImage}
                src={"/super-gana.png"}
                width={45}
                height={45}
                alt="logo"
              />
            </ActionIcon>
          </Anchor>
          <ActionIcon size="lx" variant="transparent" radius="md">
            <Image
              component={NextImage}
              src={"/conalot.png"}
              width={45}
              height={45}
              alt="logo"
            />
          </ActionIcon>
        </Group>
        <SimpleGrid cols={1} spacing={0}>
          <Title mb={20} order={4}>
            Siguenos en:
          </Title>
          <Group gap="xs" justify="flex-end" wrap="nowrap">
            <Anchor
              href="https://wa.link/e27g0b"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ActionIcon size="lx" variant="default" radius="xl">
                <IconBrandWhatsapp size={30} stroke={1.5} />
              </ActionIcon>
            </Anchor>
            <Anchor
              href="https://tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ActionIcon size="lx" variant="default" radius="xl">
                <IconBrandTiktok size={30} stroke={1.5} />
              </ActionIcon>
            </Anchor>
            <Anchor
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ActionIcon size="lx" variant="default" radius="xl">
                <IconBrandInstagram size={30} stroke={1.5} />
              </ActionIcon>
            </Anchor>
          </Group>
        </SimpleGrid>
      </div>

      <Group justify="center" className={classes.links}>
        {items}
      </Group>
      <Group mt={30} justify="center">
        <Text size="xs">© 2025 SoftHard Tecnology. All rights reserved.</Text>
      </Group>
      {showTerms && (
        <TermsAndConditionsModal
          opened={showTerms}
          onClose={() => setShowTerms(false)}
        />
      )}
    </div>
  );
}
