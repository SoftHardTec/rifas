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
    >
      <Title ta="center" order={4}>
        Términos y Condiciones
      </Title>
      <Group justify="inherit" mt="md">
        <Text size="sm">
          1.- Los números disponibles para la compra en cada uno de nuestros
          sorteos se especificarán en la página de detalles correspondientes a
          cada sorteo.
        </Text>
        <Text size="sm">
          2.- Solo podrán participar en nuestros sorteos personas naturales
          mayores de 18 años con nacionalidad venezolana o extranjeros que
          residan legalmente en Venezuelo,
        </Text>
        <Text size="sm">
          3.- Los premios deberán ser retirados en persona en la ubicación
          designada para cada Sorteo, solo realizará entregas personales en la
          dirección indicada por el ganado del primer premio o premio mayor.
        </Text>
        <Text size="sm">
          4.- La compra mínima requerida para participar en nuestros sorteos en
          de dos tickets. Los ticket serán asignado de manera aleatoria y los
          recibirás a través del correo electrónico proporcionado.
        </Text>
        <Text size="sm">
          5.- Para reclamar tu premio tienes un lapso de 12 horas.
        </Text>
        <Text size="sm">
          6.- Los ganadores aceptan aparecer en el contenido audio visual de el
          sorteo mostrando su presencia en las redes y entrega de los premios.
          Esto es OBLIGATORIO.
        </Text>
      </Group>
      <Group justify="center" mt="md">
        <Button color="rgb(230, 0, 126)" mb="md" mt="md" onClick={onClose}>
          Cerrar
        </Button>
      </Group>
    </Modal>
  );
}
