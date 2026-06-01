"use client";

import Link from "next/link";
import { useState, useCallback } from "react";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const toggleNav = useCallback(() => setNavOpen((v) => !v), []);

  return (
    <header className="ac-header">
      <div className="ac-header-content">
        <h1 className="ac-header-title">AgentClinic</h1>
        <button
          type="button"
          className="ac-header-toggle"
          onClick={toggleNav}
          aria-expanded={navOpen}
          aria-label="Toggle navigation"
        >
          ☰
        </button>
        <nav
          className={`ac-header-nav${navOpen ? " ac-header-nav-open" : ""}`}
        >
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}