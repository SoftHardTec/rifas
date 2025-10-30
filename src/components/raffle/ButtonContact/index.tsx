import { ActionIcon, Anchor } from "@mantine/core";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export default function ContactButton() {
  return (
    <Anchor
      href="https://wa.me/584243059113?text=Hola,%20necesito%20ayuda!"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ActionIcon
        size="xl"
        color="green"
        variant="filled"
        radius="xl"
        style={{
          position: "fixed",
          right: "2rem",
          bottom: "2rem",
          zIndex: 199,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <IconBrandWhatsapp size={32} />
      </ActionIcon>
    </Anchor>
  );
}
