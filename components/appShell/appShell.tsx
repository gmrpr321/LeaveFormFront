import { useDisclosure } from "@mantine/hooks";
import { AppShell, Burger, Group, Skeleton, Image } from "@mantine/core";
import React, { ReactNode } from "react";

interface BasicAppShellProps {
  children: ReactNode;
}

export default function BasicAppShell({ children }: BasicAppShellProps) {
  return (
    <AppShell header={{ height: { base: 70 } }} padding="md">
      <AppShell.Header style={{ height: "3.5rem" }}>
        <Group h="100%">Leave Form App</Group>
      </AppShell.Header>

      <AppShell.Main
        style={{
          display: "flex",

          overflow: "hidden",
        }}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
