import Link from "next/link";

export default function Header() {
  return (
    <header className="ac-header">
      <div className="ac-header-content">
        <h1 className="ac-header-title">AgentClinic</h1>
        <nav className="ac-header-nav">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}