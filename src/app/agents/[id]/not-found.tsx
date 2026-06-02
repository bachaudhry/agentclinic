import Link from "next/link";

export default function AgentNotFound() {
  return (
    <section className="not-found">
      <h1>Agent Not Found</h1>
      <p>No agent exists at this address.</p>
      <Link href="/" role="button">
        Return to Reception
      </Link>
    </section>
  );
}
