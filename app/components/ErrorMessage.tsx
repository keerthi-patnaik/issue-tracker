import { Text } from "@radix-ui/themes";
import { PropsWithChildren } from "react";

const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <Text as="p" className="text-sm text-rose-700">
      {children}
    </Text>
  );
};

export default ErrorMessage;
