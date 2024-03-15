"use client";

import { cn } from "@/lib";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();

  const NavBarLinks = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  return (
    <nav className="mb-5 flex h-14 items-center gap-6 border-b px-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex items-center gap-6">
        {NavBarLinks.map((link, index) => {
          return (
            <Link
              key={index}
              href={link.href}
              className={cn(
                "transition-color px-4 py-1 text-sm text-slate-500",
                "hover:text-slate-900",
                {
                  "rounded-full bg-slate-100 text-slate-900":
                    link.href === currentPath,
                },
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
