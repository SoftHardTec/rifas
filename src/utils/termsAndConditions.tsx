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
      <Group justify="center" mt="md">
        <Title order={4}>Terminos y Condiciones</Title>
        <Text size="sm">
          1.- Los números disponibles para la compra en cada una de nuestros
          sorteos se especificarán en la página de detalles correspondientes a
          cada sorteo.
        </Text>
        <Text size="sm">
          2.- Los tickets serán enviados en un lapso de 24 horas. Tenemos un
          alto volumen de pagos por procesor.
        </Text>
        <Text size="sm">
          3.- Solo podrán participar en nuestros sorteos personas naturales
          mayores de 18 años con nacionalidad venezolana o extranjeros que
          residan legalmente en Venezuelo,
        </Text>
        <Text size="sm">
          4.- Los premios deberán ser retirados en persona en la ubicación
          designada para cada Sorteo, solo realizará entregas personales en la
          dirección indicada por el ganado del primer premio o premio mayor.
        </Text>
        <Text size="sm">
          5.- La compra mínima requerida para participar en nuestros sorteos en
          de dos tickets. Los ticket serán asignado de manera aleatoria y los
          recibirás a través del correo electrónico proporcionado.
        </Text>
        <Text size="sm">
          6.- Para reclamar tu premio tienes un lapso de 12 horas.
        </Text>
        <Text size="sm">
          7.- Los ganadores aceptan aparecer en el contenido audio visual de el
          sorteo mostrando su presencia en las redes y entrega de los premios.
          Esto es OBLIGATORIO.
        </Text>
      </Group>
      <Group justify="center" mt="md">
        <Button mb="md" mt="md" onClick={onClose}>
          Cerrar
        </Button>
      </Group>
    </Modal>
  );
}
