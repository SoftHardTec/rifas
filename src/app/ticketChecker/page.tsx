"use client";

import {
  AppShell,
  AppShellMain,
  AppShellNavbar,
  AppShellHeader,
  Transition,
  Group,
  Flex,
  Button,
} from "@mantine/core";
import { NavbarSimple } from "@/components/ui/navbar";
import { ColorSchemesSwitcher } from "@/components/ui/color-schemes-switcher";
import { IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";
import TicketChecker from "@/components/raffle/TicketChecker";
import { useMantineColorScheme } from "@mantine/core";
export default function TicketCheckerPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  return (
    <AppShell header={{ height: 60 }} padding="md">
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
      <AppShellMain h={"100vh"}>
        <Flex justify="center" align="center" mb={20} h={"100%"}>
          <TicketChecker />
        </Flex>
      </AppShellMain>
    </AppShell>
  );
}
