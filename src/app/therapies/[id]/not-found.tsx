import Link from "next/link";

export default function TherapyNotFound() {
  return (
    <section className="not-found">
      <h1>Therapy Not Found</h1>
      <p>No therapy exists at this address.</p>
      <Link href="/" role="button">
        Return to Reception
      </Link>
    </section>
  );
}
