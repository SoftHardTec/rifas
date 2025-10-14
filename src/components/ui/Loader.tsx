import { LoadingOverlay } from "@mantine/core";

interface LoaderProps {
  visible: boolean;
}

export default function Loader({ visible }: LoaderProps) {
  return (
    <LoadingOverlay
      style={{ position: "fixed" }}
      visible={visible}
      zIndex={1000}
      overlayProps={{ radius: "sm", blur: 2, color: "black", opacity: 0.6 }}
      loaderProps={{
        color: "pink",
        type: "bars",
        size: "lg",
      }}
    />
  );
}
