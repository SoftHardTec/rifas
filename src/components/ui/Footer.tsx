"use client";

import { useState } from "react";
import { TermsAndConditionsModal } from "@/utils/termsAndConditions";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
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
  Button,
} from "@mantine/core";
import classes from "./FooterSocial.module.css";

export function Footer() {
  const [showTerms, setShowTerms] = useState(false);

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <ActionIcon
          size="lx"
          variant="transparent"
          radius="md"
          ml={{ base: 0, sm: 10 }}
          mt="xs"
          mb="xs"
        >
          <Image
            component={NextImage}
            src={"/logo.png"}
            width={100}
            height={40}
            alt="logo"
          />
        </ActionIcon>

        <Group justify="center" mt={{ base: 30, sm: 20 }} mb={20}>
          <Anchor
            href="https://supergana.com.ve/resultados.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ActionIcon size="4rem" variant="transparent" radius="md">
              <Image
                component={NextImage}
                src={"/super-gana.png"}
                width={60}
                height={60}
                alt="logo"
              />
            </ActionIcon>
          </Anchor>
          <ActionIcon size="4rem" variant="transparent" radius="md">
            <Image
              component={NextImage}
              src={"/conalot.png"}
              width={60}
              height={60}
              alt="logo"
            />
          </ActionIcon>
          <Anchor
            href="https://supergana.com.ve/resultados.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ActionIcon size="xl" variant="transparent" radius="md">
              <Image
                component={NextImage}
                src={"/tachira.png"}
                width={30}
                height={30}
                alt="logo"
              />
            </ActionIcon>
          </Anchor>
        </Group>

        <SimpleGrid cols={1} spacing={0}>
          <Title mb={20} order={4}>
            Siguenos en:
          </Title>
          <Group gap="xs" justify="flex-end" wrap="nowrap">
            <Anchor
              href="https://www.facebook.com/share/17EvpYRxPH/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ActionIcon size="lx" variant="default" radius="xl">
                <IconBrandFacebook size={30} stroke={1.5} />
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
              href="https://www.instagram.com/juegacnnosotros/?utm_source=ig_web_button_share_sheet"
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

      <Group mt="md" justify="center" className={classes.links}>
        <Anchor
          c="dimmed"
          lh={1}
          onClick={() => setShowTerms(true)}
          size="sm"
          style={{ cursor: "pointer" }}
        >
          Términos y condiciones
        </Anchor>
      </Group>
      <Group mb="md" mt={30} justify="center">
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
