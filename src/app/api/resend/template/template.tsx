import { Card, Title, Text } from "@mantine/core";

interface EmailTemplateProps {
  name: string;
  tickets: string;
  ticketCount: number;
}

export default function template({
  name,
  tickets,
  ticketCount,
}: EmailTemplateProps) {
  return (
    <Card>
      <Text></Text>
      <Text></Text>
    </Card>
  );
}

/*


Aceptor
Escriba un nro de whatsapp
Capture Boncorio
Seleccionar archivo Sin orchi...cionados
*/
