import { Blockquote, Text, List, Highlight } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";

export default function Conditions() {
  const icon = <IconInfoCircle />;
  return (
    <Blockquote color="blue" icon={icon} iconSize={30} mt="xl" p={20}>
      <Highlight highlight="Chance A" fw={700} color="red">
        El sorteo se jugará con la loteria del Chance A
      </Highlight>
      <List withPadding>
        <List.Item>
          <Text>1:00pm - 3er Premio</Text>
        </List.Item>
        <List.Item>
          <Text>4:30pm - 2do Premio</Text>
        </List.Item>
        <List.Item>
          <Text>7:00pm - 1er Premio</Text>
        </List.Item>
      </List>
    </Blockquote>
  );
}
