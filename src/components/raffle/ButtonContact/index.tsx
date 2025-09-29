import { ActionIcon, Anchor } from "@mantine/core";
import { IconBrandWhatsapp } from "@tabler/icons-react";

export default function ContactButton() {
  return (
    <Anchor
      href="https://wa.me/573136662634"
      target="_blank"
      rel="noopener noreferrer"
    >
      <ActionIcon
        size="xl"
        color="teal"
        variant="filled"
        radius="xl"
        style={{
          position: "fixed",
          right: "2rem",
          bottom: "2rem",
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <IconBrandWhatsapp size={32} />
      </ActionIcon>
    </Anchor>
  );
}
