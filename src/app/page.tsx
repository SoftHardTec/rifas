"use client";
import { ColorSchemesSwitcher } from "@/components/ui/color-schemes-switcher";
import { useMantineColorScheme } from "@mantine/core";
import { HomeRaffle } from "@/components/raffle/Home";
import {
  AppShell,
  AppShellNavbar,
  AppShellHeader,
  AppShellMain,
  Group,
  Button,
  Flex,
  Transition,
} from "@mantine/core";

import { NavbarSimple } from "@/components/ui/navbar";
import { useState } from "react";
import { IconMenu2 } from "@tabler/icons-react";

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <div id="main"></div>
      <AppShellHeader>
        <Transition
          mounted={showNavbar}
          transition="slide-right"
          duration={300}
        >
          {(styles) => (
            <AppShellNavbar style={styles}>
              <NavbarSimple />
            </AppShellNavbar>
          )}
        </Transition>
        <Flex justify="space-between" className="h-full w-full">
          <Group className="h-full px-md justify-start" gap="md">
            <Button
              onClick={() => setShowNavbar((prev) => !prev)}
              variant="transparent"
              color={colorScheme === "light" ? "black" : "white"}
              size="sm"
            >
              <IconMenu2 color={colorScheme === "light" ? "black" : "white"} />
            </Button>
          </Group>
          <Group className="h-full px-md justify-end" gap="md">
            <ColorSchemesSwitcher />
          </Group>
        </Flex>
      </AppShellHeader>
      <AppShellMain>
        <HomeRaffle />
        <div id="contacto"></div>
      </AppShellMain>
    </AppShell>
  );
}
