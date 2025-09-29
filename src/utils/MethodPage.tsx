import {
  Stack,
  Text,
  Title,
  CopyButton,
  Tooltip,
  ActionIcon,
  Group,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
interface MethodProps {
  ticketCount: number | null;
}

interface MethodData {
  title: string;
  fields: { label: string; value: string | number }[];
}

function MethodStack({ title, fields }: MethodData) {
  // Buscar el banco por el título (ignorando paréntesis y minúsculas)
  const banco = methodPage.find((b) => {
    const cleanTitle = title.trim().toLowerCase();
    const compName = b.component?.name?.toLowerCase();
    return compName && cleanTitle.includes(compName.replace("banco", ""));
  });
  return (
    <Stack m="lg" ml="2rem" gap="md">
      <Group>
        <Title order={4}>{title}</Title>
        <CopyButton value={banco?.copyValue || ""} timeout={2000}>
          {({ copied, copy }) => (
            <Tooltip
              label={copied ? "Copied" : "Copy"}
              withArrow
              position="right"
            >
              <ActionIcon
                color={copied ? "teal" : "gray"}
                variant="subtle"
                onClick={copy}
                mr={0}
              >
                {copied ? <IconCheck size={23} /> : <IconCopy size={23} />}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      </Group>
      {fields.map((field, idx) => (
        <div
          key={idx}
          style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
        >
          <Title order={5}>{field.label}</Title>
          <Text>{field.value}</Text>
          <CopyButton value={String(field.value)}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copiado" : "Copiar"}
                withArrow
                position="right"
              >
                <ActionIcon
                  color={copied ? "teal" : "gray"}
                  onClick={copy}
                  variant="light"
                >
                  {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </div>
      ))}
    </Stack>
  );
}
export function Venezuela({ ticketCount }: MethodProps) {
  return (
    <MethodStack
      title="Pago Movil Venezuela"
      fields={[
        { label: "Cuenta:", value: "0102" },
        { label: "Cedula:", value: "27.153.835" },
        { label: "Telefono:", value: "0414-1234567" },
        {
          label: "Monto",
          value: ticketCount
            ? `Bs. ${ticketCount * 180}.00`
            : "Seleccione una cantidad de boletos",
        },
      ]}
    />
  );
}

export function Mercantil({ ticketCount }: MethodProps) {
  return (
    <MethodStack
      title="Pago Movil Mercantil"
      fields={[
        { label: "Cuenta:", value: "0105" },
        { label: "Cedula:", value: "27.153.835" },
        { label: "Telefono:", value: "0414-1234567" },
        {
          label: "Monto",
          value: ticketCount
            ? `Bs. ${ticketCount * 180}.00`
            : "Seleccione una cantidad de boletos",
        },
      ]}
    />
  );
}

export function Zinli({ ticketCount }: MethodProps) {
  return (
    <MethodStack
      title="Zinli (Min: 6 boletos)"
      fields={[
        { label: "Correo", value: "correo@gmail.com" },
        { label: "Titular", value: "Luis Miguel Peña R." },
        {
          label: "Monto",
          value:
            ticketCount && ticketCount > 5
              ? `$${ticketCount}`
              : "Seleccione al menos 6 boletos",
        },
      ]}
    />
  );
}

export function Zelle({ ticketCount }: MethodProps) {
  return (
    <MethodStack
      title="Zelle (Min: 6 boletos)"
      fields={[
        { label: "Correo", value: "correo@gmail.com" },
        { label: "Titular", value: "Luis Miguel Peña R." },
        {
          label: "Monto",
          value:
            ticketCount && ticketCount > 5
              ? `$${ticketCount}`
              : "Seleccione al menos 6 boletos",
        },
      ]}
    />
  );
}

export function Binance({ ticketCount }: MethodProps) {
  return (
    <MethodStack
      title="Binance (Min: 6 boletos)"
      fields={[
        { label: "Correo", value: "correo@gmail.com" },
        { label: "Titular", value: "Luis Miguel Peña R." },
        {
          label: "Monto",
          value:
            ticketCount && ticketCount > 5
              ? `$${ticketCount}`
              : "Seleccione al menos 6 boletos",
        },
      ]}
    />
  );
}

export const methodPage = [
  {
    key: "venezuela",
    label: "BDV",
    component: Venezuela,
    copyValue: "0102 Banco Venezuela\n27.153.835\n0414-1234567",
  },
  {
    key: "mercantil",
    label: "Mercantil",
    component: Mercantil,
    copyValue: "0105 Banco Mercantil\n27.153.835\n0414-1234567",
  },
  {
    key: "zinli",
    label: "Zinli",
    component: Zinli,
    copyValue: "correo@gmail.com",
  },
  {
    key: "zelle",
    label: "Zelle",
    component: Zelle,
    copyValue: "correo@gmail.com",
  },
  {
    key: "binance",
    label: "Binance",
    component: Binance,
    copyValue: "correo@gmail.com",
  },
];
