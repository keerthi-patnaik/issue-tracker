import { cn } from "@/lib";
import Link from "next/link";
import { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};
const ButtonLink = ({ href, children, className }: ButtonLinkProps) => {
  return (
    <Link
      className={cn(
        "flex items-center justify-center rounded-md bg-[#01a2c7] px-4 py-1.5",
        "text-sm font-medium text-white  hover:bg-[#0797b9] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[#3db9ce]",
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
