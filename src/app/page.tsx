"use client";
import { useState, useEffect } from "react";
import { ColorSchemesSwitcher } from "@/components/ui/color-schemes-switcher";
import { HomeRaffle } from "@/components/raffle/Home";
import { AppShell, AppShellHeader, AppShellMain, Group } from "@mantine/core";
import { Footer } from "@/components/ui/Footer";
import { TermsAndConditionsModal } from "@/utils/termsAndConditions";

export default function Home() {
  const [termsModalOpened, setTermsModalOpened] = useState(true);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (!hasVisited) {
      setTermsModalOpened(true);
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, []);

  return (
    <>
      <TermsAndConditionsModal
        opened={termsModalOpened}
        onClose={() => setTermsModalOpened(false)}
      />
      <AppShell header={{ height: 60 }} padding="md">
        <div id="main"></div>
        <AppShellHeader>
          <Group className="h-full px-md justify-end" gap="lg" mr="md">
            <ColorSchemesSwitcher />
          </Group>
        </AppShellHeader>
        <AppShellMain>
          <HomeRaffle />
        </AppShellMain>
        <Footer />
      </AppShell>
    </>
  );
}
