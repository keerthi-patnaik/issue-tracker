import { Link as RadixLink } from "@radix-ui/themes";
import Link from "next/link";

type CustomLinkProps = {
  href: string;
  children: string;
};

const CustomLink = ({ href, children }: CustomLinkProps) => {
  return (
    <Link href={href} passHref legacyBehavior>
      {<RadixLink>{children}</RadixLink>}
    </Link>
  );
};

export default CustomLink;
