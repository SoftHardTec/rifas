"use client";

import { useState, useEffect } from "react";
import { HomeRaffle } from "@/components/raffle/Home";
import { AppShell, AppShellHeader, AppShellMain, Group } from "@mantine/core";
import { Footer } from "@/components/ui/Footer";
import { TermsAndConditionsModal } from "@/utils/termsAndConditions";
import Header from "@/components/ui/Header";

export default function Home() {
  const [termsModalOpened, setTermsModalOpened] = useState(false);

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
      <AppShell header={{ height: 70 }} padding="md">
        <AppShellHeader mb="lg">
          <Header />
        </AppShellHeader>
        <AppShellMain>
          <HomeRaffle />
        </AppShellMain>
        <Footer />
      </AppShell>
    </>
  );
}
