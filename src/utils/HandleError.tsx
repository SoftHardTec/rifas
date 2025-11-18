import { Modal, Title, Group, Container } from "@mantine/core";
import { IconExclamationCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type HandleErrorProps = {
  opened: boolean;
  title: string;
};
export default function HandleError({ opened, title }: HandleErrorProps) {
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      setIsOpened(true);
    }
  }, [opened, title]); // Se activa cuando el padre envía una nueva señal de error.

  useEffect(() => {
    if (!isOpened) {
      return;
    }
    const timer = setTimeout(() => {
      setIsOpened(false); // Se cierra a sí mismo después del tiempo.
    }, 2500);

    return () => clearTimeout(timer);
  }, [isOpened]);

  return (
    <Modal
      opened={isOpened}
      onClose={() => setIsOpened} // Permite al usuario cerrar el modal manualmente.
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
