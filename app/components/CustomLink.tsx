import { Link as RadixLink } from "@radix-ui/themes";
import Link from "next/link";
import { ReactNode } from "react";

type CustomLinkProps = {
  href: string;
  children: string | ReactNode;
};

const CustomLink = ({ href, children }: CustomLinkProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      {<RadixLink>{children}</RadixLink>}
    </Link>
  );
};

export default CustomLink;
