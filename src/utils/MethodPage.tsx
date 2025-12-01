"USDe client";
import {
  Stack,
  Text,
  Title,
  CopyButton,
  Tooltip,
  ActionIcon,
  Group,
  Flex,
} from "@mantine/core";
import { IconCopy, IconCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";

interface MethodProps {
  ticketCount: number | null; // El prop 'key' es manejado por React y no debe ser declarado aquí.
}

interface MethodData {
  title: string;
  fields: { label: string; value: string | number | undefined }[];
}

interface basemethodComponet {
  methodKey: string;
  ticketCount: number | null;
}

function MethodStack({
  title,
  fields,
  copyValue,
}: MethodData & { copyValue?: string }) {
  return (
    <Stack m="lg" ml="xs" gap="md">
      <Group>
        <Title order={4} fz={{ base: "h5", sm: "h4" }}>
          {title}
        </Title>
        <CopyButton value={copyValue || ""} timeout={2000}>
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
        <Flex key={idx} align="center" gap="0.5rem" wrap="wrap">
          <Title order={5} fz={{ base: "sm", sm: "lg" }}>
            {field.label}
          </Title>
          <Text fz={{ base: "sm", sm: "lg" }}>{field.value}</Text>
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
                  variant="transparent"
                >
                  {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Flex>
      ))}
    </Stack>
  );
}

function BaseMethodComponent({ methodKey, ticketCount }: basemethodComponet) {
  const method = methodPage.find((m) => m.key === methodKey);
  const [amount, setAmount] = useState<string | null>(null);

  useEffect(() => {
    if (method && ticketCount) {
      if (ticketCount < method.minTickets) {
        setAmount(`Seleccione al menos ${method.minTickets} tickets`);
      } else {
        setAmount(method.formatAmount(ticketCount));
      }
    } else {
      setAmount("Seleccione una cantidad de tickets");
    }
  }, [ticketCount, method]);

  if (!method) return null;

  const fields: { label: string; value: string | number | undefined }[] =
    method.details.map((detail) => ({ ...detail })); // Create a mutable copy
  fields.push({ label: "Monto", value: amount ?? undefined });

  const CopyValue =
    method.copyValue && amount
      ? `${method.copyValue}\n${amount}`
      : method.copyValue;

  return (
    <MethodStack title={method.title} fields={fields} copyValue={CopyValue} />
  );
}

export function Venezuela({ ticketCount }: MethodProps) {
  return (
    <BaseMethodComponent methodKey="Venezuela" ticketCount={ticketCount} />
  );
}
export function Mercantil({ ticketCount }: MethodProps) {
  return (
    <BaseMethodComponent methodKey="Mercantil" ticketCount={ticketCount} />
  );
}
export function Yape({ ticketCount }: MethodProps) {
  return <BaseMethodComponent methodKey="Yape" ticketCount={ticketCount} />;
}

export function Zinli({ ticketCount }: MethodProps) {
  return <BaseMethodComponent methodKey="Zinli" ticketCount={ticketCount} />;
}

export function Binance({ ticketCount }: MethodProps) {
  return <BaseMethodComponent methodKey="Binance" ticketCount={ticketCount} />;
}
export function Nequi({ ticketCount }: MethodProps) {
  return <BaseMethodComponent methodKey="Nequi" ticketCount={ticketCount} />;
}
export function Zelle({ ticketCount }: MethodProps) {
  return <BaseMethodComponent methodKey="Zelle" ticketCount={ticketCount} />;
}

export const methodPage = [
  {
    key: "Venezuela",
    label: "Venezuela",
    title: "Pago Movil Venezuela",
    pricePerTicket: 140,
    minTickets: 2,
    formatAmount(count: number) {
      let priceTickets = 0;

      switch (count) {
        case 5:
          priceTickets = 620;
          break;
        case 10:
          priceTickets = 1150;
          break;
        case 20:
          priceTickets = 2160;
          break;
        default:
          priceTickets = count * this.pricePerTicket;
      }
      return (
        "Bs. " +
        priceTickets.toLocaleString("es-ES", {
          minimumFractionDigits: 2,
          useGrouping: true,
        })
      );
    },
    details: [
      { label: "Cuenta:", value: "0102" },
      { label: "Cédula:", value: "22.338.937" },
      { label: "Teléfono:", value: "04149454986" },
    ],
    copyValue: "0102 Banco Venezuela\n22338937\n04149454986",
  },
  {
    key: "Yape",
    label: "Yape",
    title: "Yape",
    pricePerTicket: 5,
    minTickets: 2,
    formatAmount(count: number) {
      return (
        "S/ " +
        (count * this.pricePerTicket).toLocaleString("es-ES", {
          minimumFractionDigits: 2,
          useGrouping: true,
        })
      );
    },
    details: [
      { label: "Telefono", value: "917756288" },
      { label: "Titular", value: "Evimar Medina" },
    ],
    copyValue: `917756288`,
  },
  {
    key: "Binance",
    label: "Binance",
    title: "Binance (Min 6 tickets)",
    pricePerTicket: 1,
    minTickets: 6,
    formatAmount(count: number) {
      return (
        "$" +
        (count * this.pricePerTicket).toLocaleString("es-ES", {
          minimumFractionDigits: 2,
        })
      );
    },
    details: [
      { label: "Correo", value: "dv0510.27@gmail.com" },
      { label: "Titular", value: "DamelisAg" },
    ],
    copyValue: "dv0510.27@gmail.com",
  },
  {
    key: "Nequi",
    label: "Nequi",
    title: "Nequi",
    pricePerTicket: 4000,
    minTickets: 2,
    formatAmount(count: number) {
      return (
        "COP " +
        (count * this.pricePerTicket).toLocaleString("es-ES", {
          minimumFractionDigits: 2,
          useGrouping: true,
        })
      );
    },
    details: [
      { label: "Telefono", value: "3017275410" },
      { label: "Titular", value: "Jhon Ruiz" },
    ],
    copyValue: "3017275410",
  },
  {
    key: "Zelle",
    label: "Zelle",
    title: "Zelle (Min 6 tickets)",
    pricePerTicket: 1,
    minTickets: 6,
    formatAmount(count: number) {
      return (
        "$" +
        (count * this.pricePerTicket).toLocaleString("es-ES", {
          minimumFractionDigits: 2,
        })
      );
    },
    details: [
      { label: "Correo", value: "oliverosyorgelys@gmail.com" },
      { label: "Titular", value: "Yorgelys Oliveros" },
    ],
    copyValue: "oliverosyorgelys@gmail.com",
  },
];
