import { Modal, Title, Text, Group, Container } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useEffect } from "react";

type HandleErrorProps = {
  opened: boolean;
  onClose: () => void;
  title: string;
};
export default function HandleError({
  opened,
  onClose,
  title,
}: HandleErrorProps) {
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
      overlayProps={{ backgroundOpacity: 0.5, blur: 7 }}
      transitionProps={{ transition: "fade", duration: 200 }}
      withCloseButton={false}
      size="35rem"
      radius={25}
    >
      <Container px="md" py="xl">
        <Group justify="center">
          <IconExclamationCircle size={80} color="#D11111" />
          <Title c="black" order={2}>
            {title}
          </Title>
        </Group>
      </Container>
    </Modal>
  );
}
