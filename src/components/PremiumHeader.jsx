"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, Feather } from "lucide-react";

export default function PremiumHeader({
  nav,
  poetName,
  poetNameLatin,
  active,
  transparent = false,
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const burgerRef = useRef(null);
  const menuRef = useRef(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      wasOpen.current = true;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKey);
      const timer = setTimeout(() => {
        menuRef.current?.querySelector("a")?.focus();
      }, 140);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
        window.removeEventListener("keydown", onKey);
      };
    }
    document.body.style.overflow = "";
    if (wasOpen.current) {
      wasOpen.current = false;
      burgerRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 1100) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const isActive = (href) => (active ? href === active : href === "/");
  const overHero = transparent && !scrolled && !open;

  return (
    <>
      <header
        className={[
          "nav",
          scrolled ? "scrolled" : "",
          overHero ? "over-hero" : "",
          open ? "menu-open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="nav-inner">
          <a href="/" className="brand" aria-label={`${poetName} — मुख्य पृष्ठ`}>
            <span className="brand-mark" aria-hidden="true">
              <Feather size={20} />
            </span>
            <span className="brand-text">
              <b>{poetName}</b>
              <small>{poetNameLatin}</small>
            </span>
          </a>

          <nav className="nav-links" aria-label="मुख्य नेविगेशन">
            {nav.map(([href, label]) => (
              <a
                key={href}
                href={href}
                className={isActive(href) ? "active" : undefined}
                aria-current={isActive(href) ? "page" : undefined}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="nav-cta">
            <a href="/contact/" className="btn btn-gold">
              संपर्क करें
            </a>
            <button
              type="button"
              ref={burgerRef}
              className="burger"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "मेन्यू बंद करें" : "मेन्यू खोलें"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <nav
        id="mobile-menu"
        ref={menuRef}
        className={`mobile-menu${open ? " open" : ""}`}
        aria-label="मोबाइल नेविगेशन"
        aria-hidden={!open}
      >
        {nav.map(([href, label]) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={isActive(href) ? "active" : undefined}
            tabIndex={open ? 0 : -1}
          >
            {label}
          </a>
        ))}
        <a
          href="/contact/"
          className="btn btn-gold mm-cta"
          onClick={() => setOpen(false)}
          tabIndex={open ? 0 : -1}
        >
          संपर्क करें
        </a>
      </nav>
    </>
  );
}
