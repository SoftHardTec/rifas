import NextImage from "next/image";
import { ActionIcon, Group, Image } from "@mantine/core";

export default function Header() {
  return (
    <Group ml="xl">
      <ActionIcon
        size="6rem"
        variant="transparent"
        radius="md"
        mb="lg"
        top="-1rem"
      >
        <Image
          component={NextImage}
          src={"/logo.png"}
          width={200}
          height={90}
          alt="logo"
        />
      </ActionIcon>
    </Group>
  );
}
