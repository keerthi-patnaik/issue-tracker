"use client";

import { cn } from "@/lib";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Spinner } from "./components";

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
            <ul className="flex items-center gap-3">
              {NavBarLinks.map((link, index) => {
                return (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center px-4 py-1 text-sm font-medium text-slate-700 transition-colors",
                        "hover:text-slate-900",
                        {
                          "rounded-md bg-slate-100 text-slate-900":
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
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Avatar
                    src={session.user!.image!}
                    fallback="?"
                    size="2"
                    radius="full"
                    color="gray"
                    highContrast
                    referrerPolicy="no-referrer"
                  />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Item>
                    <Text size="2">{session.user?.email}</Text>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <Link href="/api/auth/signout">Log out</Link>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}
            {status === "unauthenticated" && (
              <Link
                className="flex items-center rounded-md px-4 py-1 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100"
                href="/api/auth/signin"
              >
                Login
              </Link>
            )}
            {status === "loading" && (
              <Box className="w-20 text-center">
                <Spinner />
              </Box>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
