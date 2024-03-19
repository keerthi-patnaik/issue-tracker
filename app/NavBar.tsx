"use client";

import { cn } from "@/lib";
import { Box } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const NavBarLinks = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues/list",
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
            <li key={index}>
              <Link
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
            </li>
          );
        })}
      </ul>
      <Box>
        {status === "unauthenticated" ? (
          <Link href="/api/auth/signin">LogIn</Link>
        ) : (
          <Link href="/api/auth/signout">Log out</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
