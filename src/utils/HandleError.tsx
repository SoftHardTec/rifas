import { Modal, Title, Text, Group } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useEffect } from "react";

type HandleErrorProps = {
  opened: boolean;
  onClose: () => void;
  title: string;
  text?: string;
};
export default function HandleError({
  opened,
  onClose,
  title,
  text,
}: HandleErrorProps) {
  useEffect(() => {
    if (!opened) {
      return;
    }
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [opened, onClose]);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      overlayProps={{ backgroundOpacity: 0.5, blur: 2 }}
      transitionProps={{ transition: "fade", duration: 200 }}
      withCloseButton={false}
      w={400}
      h={400}
    >
      <Group>
        <IconExclamationCircle size={48} color="red" />
        <Title order={3}>{title}</Title>
      </Group>
      <Text mt="md">{text}</Text>
    </Modal>
  );
}
