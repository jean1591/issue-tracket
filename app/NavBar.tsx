"use client";

import { AiFillBug } from "react-icons/ai";
import { Box } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues/list" },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <AiFillBug />
      </Link>

      <ul className="flex space-x-6">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={classNames({
                "hover:text-zinc-800 transition-colors": true,
                "text-zinc-900": href === currentPath,
                "text-zinc-500": href !== currentPath,
              })}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Log in</Link>
        )}
      </Box>
    </nav>
  );
};

export default NavBar;
