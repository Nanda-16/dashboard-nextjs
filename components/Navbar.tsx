"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dancing_Script } from "next/font/google";
import { NavbarStyles } from "./styles/styles";

const dancingScript = Dancing_Script({ subsets: ["latin"] });

interface NavContextValue {
  open: boolean;
  toggle: () => void;
}

const navcontext = createContext<NavContextValue | undefined>(undefined);

export const Navbar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string | null;
}) => {
  const [open, setOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);
  const toggle = () => {
    setOpen((prevState) => !prevState);
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (window.innerWidth < 1024) {
        if (!navbarRef.current?.contains(event?.target as HTMLElement)) {
          if (!open) return;
          setOpen(false);
        }
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [open, navbarRef]);
  return (
    <navcontext.Provider value={{ open, toggle }}>
      <nav ref={navbarRef} className={`${className} ${NavbarStyles.navbar}`}>
        {children}
      </nav>
    </navcontext.Provider>
  );
};

export const NavbarToggler = () => {
  const { toggle } = useContext(navcontext)!;
  return (
    <button
      type="button"
      aria-expanded="false"
      aria-label="Toggle navigation"
      className={NavbarStyles.toggler}
      onClick={toggle}
    >
      &#8801;
    </button>
  );
};

export const NavbarCollapse = ({ children }: { children: React.ReactNode }) => {
  const { open } = useContext(navcontext)!; // Adding '!' to assert that navcontext is not undefined
  return (
    <div
      style={{ backgroundColor: "inherit" }}
      className={`${NavbarStyles.collapse.default}
              ${open ? NavbarStyles.collapse.open : NavbarStyles.collapse.close}`}
    >
      {children}
    </div>
  );
};

export const NavbarHead = ({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) => (
  <Link href={href} className={`${dancingScript.className} ${NavbarStyles.head}`}>
    <strong>{children}</strong>
  </Link>
);

type Orientation = "start" | "middle" | "end";

export const NavbarNav = ({
  children,
  orientation,
}: {
  children: React.ReactNode;
  orientation: Orientation;
}) => <ul className={NavbarStyles.nav[orientation]}>{children}</ul>;

export const NavbarItem = ({ children }: { children: React.ReactNode }) => (
  <li className={NavbarStyles.item}>{children}</li>
);

interface NavLinks {
  navLinks: {
    name: string;
    href: string;
  }[];
}

export const NavbarLink = ({ navLinks }: NavLinks) => {
  const pathname = usePathname();
  return (
    <>
      {navLinks?.map((link, index) => {
        const isActive = pathname.startsWith(link.href);

        return (
          <li className={`${NavbarStyles.item} ${NavbarStyles.link}`} key={index + 1}>
            <Link
              className={isActive ? "underline" : ""}
              href={link.href}
              key={link.name}
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </>
  );
};