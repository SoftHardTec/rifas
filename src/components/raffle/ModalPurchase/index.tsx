import { Modal, Button, Title, Text, Container, Flex } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";

interface ModalPurchaseProps {
  opened: boolean;
  close: () => void;
}
export default function ModalPurchase({ opened, close }: ModalPurchaseProps) {
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        fullScreen
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <Container h="100%">
          <Flex
            direction="column"
            justify="center"
            mt="xl"
            style={{ alignItems: "center" }}
          >
            <IconCircleCheck size="6rem" color="green" />
            <Title mt="lg" order={2}>
              Compra Exitosa!
            </Title>
            <Text ta="center" size="sm" mt="md">
              Recibirás un correo electrónico con el comprobante de tus boletos,
              el cual deberás guardar en caso de que seas el afortunado.
            </Text>
          </Flex>
        </Container>
        <Container
          pos="absolute"
          bottom={0}
          left={0}
          right={0}
          px="xl"
          pb="1.5rem"
          mb="lg"
        >
          <Button
            fullWidth
            size="sm"
            radius="lg"
            variant="filled"
            onClick={close}
          >
            Regresar al Inicio
          </Button>
        </Container>
      </Modal>
    </>
  );
}
