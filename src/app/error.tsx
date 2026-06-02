"use client";

import Link from "next/link";

export default function GlobalError() {
  return (
    <section className="not-found">
      <h1>Something Went Wrong</h1>
      <p>The clinic experienced an unexpected error. Please try again.</p>
      <Link href="/" role="button">
        Return to Reception
      </Link>
    </section>
  );
}
