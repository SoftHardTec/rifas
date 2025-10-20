import { Modal, Title, Text, Group, Container } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useEffect } from "react";

type ComfirmationProps = {
  opened: boolean;
  onClose: () => void;
};
export default function Confirmation({ opened, onClose }: ComfirmationProps) {
  useEffect(() => {
    if (!opened) {
      return;
    }
    const timer = setTimeout(() => {
      onClose();
    }, 2500);

    return () => clearTimeout(timer);
  }, [opened, onClose]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      overlayProps={{ backgroundOpacity: 0.4, blur: 4 }}
      transitionProps={{ transition: "fade", duration: 200 }}
      withCloseButton={false}
      size="35rem"
      radius={25}
    >
      <Container px="md" py="xl">
        <Group justify="center">
          <IconCircleCheck size={80} color="green" />
          <Title c="white" order={2}>
            Su Compra fue Exitosa!
          </Title>
        </Group>
      </Container>
    </Modal>
  );
}
