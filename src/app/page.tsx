"use client";
import { ColorSchemesSwitcher } from "@/components/ui/color-schemes-switcher";
import { HomeRaffle } from "@/components/raffle/Home";
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  Group,
  Flex,
} from "@mantine/core";

export default function Home() {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <div id="main"></div>
      <AppShellHeader>
        <Group className="h-full px-md justify-end" gap="lg" mr="md">
          <ColorSchemesSwitcher />
        </Group>
      </AppShellHeader>
      <AppShellMain>
        <HomeRaffle />
        <div id="contacto"></div>
      </AppShellMain>
    </AppShell>
  );
}
