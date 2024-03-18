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
        "flex items-center justify-center rounded-md bg-[#12a594] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#0c9b8a]",
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
