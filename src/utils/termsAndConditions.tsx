"use client";

import { Modal, Button, Title, Text, Group } from "@mantine/core";

type TermsAndConditionsModalProps = {
  opened: boolean;
  onClose: () => void;
};

export function TermsAndConditionsModal({
  opened,
  onClose,
}: TermsAndConditionsModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
      transitionProps={{ transition: "fade", duration: 200 }}
      withCloseButton={false}
    >
      <Group justify="center" mt="md">
        <Title order={3}>Términos y condiciones</Title>
        <Text>Contenido de la tarjeta...</Text>
      </Group>
      <Group justify="center" mt="md">
        <Button mt="md" onClick={onClose}>
          Cerrar
        </Button>
      </Group>
    </Modal>
  );
}
