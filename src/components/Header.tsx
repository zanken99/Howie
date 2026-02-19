"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { language, setLanguage, t } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/#games", label: t("nav.catalog") },
    { href: "/faq", label: t("nav.faq") },
    { href: "/guarantees", label: t("nav.guarantees") },
    { href: "https://t.me/HowieCheat_bot", label: t("nav.support") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "glass-panel bg-opacity-90 rounded-none border-t-0 border-x-0"
        : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group relative top-2">
          <div className="relative w-28 h-28 flex items-center justify-center transition-all group-hover:scale-105">
            <img src="/media/logo.png" alt="HowieCheats Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tight text-white font-[family-name:var(--font-display)]">
              HOWIE
            </span>
            <span className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-primary)] uppercase">
              CHEATS
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-2 py-1 text-sm font-semibold text-gray-400 hover:text-[var(--color-primary)] transition-all uppercase tracking-wider font-[family-name:var(--font-display)] relative group"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-primary)] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          ))}
        </nav>

        {/* Lang Switcher */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 bg-white/5 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setLanguage("ru")}
              className={`px-2 py-1 text-xs font-bold rounded ${language === "ru" ? "bg-[var(--color-primary)] text-black" : "text-gray-400 hover:text-white"}`}
            >
              RU
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2 py-1 text-xs font-bold rounded ${language === "en" ? "bg-[var(--color-primary)] text-black" : "text-gray-400 hover:text-white"}`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/5"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className="space-y-1.5">
            <span
              className={`block w-5 h-0.5 bg-[var(--color-primary)] transition-all ${isMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--color-primary)] transition-all ${isMenuOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--color-primary)] transition-all ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel m-2 border-[var(--glass-border)]">
          <nav className="flex flex-col p-4 gap-1">
            <div className="flex gap-2 mb-4 justify-center">
              <button
                onClick={() => setLanguage("ru")}
                className={`px-3 py-1 text-sm font-bold rounded ${language === "ru" ? "bg-[var(--color-primary)] text-black" : "bg-white/5 text-gray-400"}`}
              >
                RU
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 text-sm font-bold rounded ${language === "en" ? "bg-[var(--color-primary)] text-black" : "bg-white/5 text-gray-400"}`}
              >
                EN
              </button>
            </div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[var(--color-primary)] py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all font-[family-name:var(--font-display)]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
