"use client";

import { cn } from "@/lib";
import { Box, Container, Flex } from "@radix-ui/themes";
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
    <nav className="mb-5 border-b px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex gap-3">
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
          </Flex>
          <Box>
            {status === "unauthenticated" ? (
              <Link href="/api/auth/signin">Login</Link>
            ) : (
              <Link href="/api/auth/signout">Log out</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
