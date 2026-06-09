import Link from "next/link";

export default function AilmentNotFound() {
  return (
    <section className="not-found">
      <h1>Ailment Not Found</h1>
      <p>No ailment exists at this address.</p>
      <Link href="/ailments" role="button">
        Return to Ailments List
      </Link>
    </section>
  );
}
