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
        "flex items-center justify-center rounded-md bg-[var(--accent-9)] px-4 py-1.5",
        "text-sm font-medium text-white  hover:bg-[var(--accent-10)] focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-[var(--accent-9)]",
        className,
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
