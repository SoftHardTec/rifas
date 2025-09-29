"use client";

import { useMantineColorScheme, Group, ActionIcon, rem } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useLayoutEffect, useState } from "react";

export function ColorSchemesSwitcher() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || colorScheme === "auto") {
    return null;
  }

  const renderIcon = () => {
    const iconProps = { style: { width: rem(24), height: rem(24) } };
    return colorScheme === "light" ? (
      <IconMoon {...iconProps} />
    ) : (
      <IconSun {...iconProps} />
    );
  };

  return (
    <Group>
      <ActionIcon
        size={42}
        variant="default"
        aria-label="Toggle color scheme"
        onClick={() =>
          setColorScheme(colorScheme === "light" ? "dark" : "light")
        }
      >
        {renderIcon()}
      </ActionIcon>
    </Group>
  );
}
