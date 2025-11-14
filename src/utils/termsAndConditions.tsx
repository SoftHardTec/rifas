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
      closeOnClickOutside={false}
    >
      <Title mt={25} ta="center" order={4}>
        Términos y Condiciones
      </Title>
      <Group justify="inherit" mt="md">
        <Text size="sm">
          1.- Los números disponibles para la compra en cada uno de nuestros
          sorteos, se especificarán en la página de detalles correspondientes a
          cada sorteo.
        </Text>
        <Text size="sm">
          2.- Solo podrán participar en nuestros sorteos personas naturales
          <strong> mayores de 18 años</strong>.
        </Text>
        <Text size="sm">
          3.- Los premios deberán ser retirados en persona en la ubicación
          designada para cada Sorteo. Solo se realizarán entregas personales en
          la dirección indicada por el ganador del primer premio o premio mayor.
          (En caso de no residir en Venezuela el premio se entregará a un
          responsable que resida en la misma).
        </Text>
        <Text size="sm">
          4.- La compra mínima requerida para participar en nuestros sorteos es
          de <strong> 2 tickets</strong>. Los tickets serán asignado de manera
          aleatoria y los recibirás a través del correo electrónico
          proporcionado.
        </Text>
        <Text size="sm">
          5.- Para reclamar tu premio tienes un lapso de{" "}
          <strong>72 horas.</strong>
        </Text>
        <Text size="sm">
          6.- Los ganadores aceptan aparecer en el contenido audiovisual de el
          sorteo mostrando su presencia en las redes y entrega de los premios.
          <strong> Esto es OBLIGATORIO.</strong>
        </Text>
      </Group>
      <Group gap={40} justify="center" mt="md">
        <Button
          variant="outline"
          color="#C72200"
          onClick={() => (opened = true)}
        >
          Rechazar
        </Button>
        <Button color="rgb(230, 0, 126)" mb="md" mt="md" onClick={onClose}>
          Aceptar
        </Button>
      </Group>
    </Modal>
  );
}
