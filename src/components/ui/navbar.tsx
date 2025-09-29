"use client";

import { useState, useEffect, useRef } from "react";
import { IconBadge, IconMessage, IconHome } from "@tabler/icons-react";
import classes from "./NavbarStyle.module.css";

const data = [
  { link: "/#main", label: "Inicio", icon: IconHome },
  {
    link: "/ticketChecker",
    label: "Verificar Ticket",
    icon: IconBadge,
  },
  { link: "/#contacto", label: "Contacto", icon: IconMessage },
];

export function NavbarSimple() {
  const [active, setActive] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("navbarActive") || "Inicio";
    }
    return "Inicio";
  });
  const [opened, setOpened] = useState(true);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("navbarActive", active);
  }, [active]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpened(false);
      }
    }
    function handleScroll() {
      setOpened(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = data.map((item) => (
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={() => setActive(item.label)}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  if (!opened) return null;

  return (
    <nav className={classes.navbar} ref={navRef}>
      <div className={classes.navbarMain}>{links}</div>
    </nav>
  );
}
