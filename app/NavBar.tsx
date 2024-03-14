import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const NavBarLinks = [
    {
      label: "",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/",
    },
  ];
  return (
    <nav className="mb-5 flex h-14 items-center space-x-6 border-b px-5">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {NavBarLinks.map((link, index) => {
          return (
            <Link
              key={index}
              href={link.href}
              className="text-slate-500 transition delay-150 duration-300 hover:text-slate-900 hover:delay-300"
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
