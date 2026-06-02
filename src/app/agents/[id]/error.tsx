"use client";

import Link from "next/link";

export default function AgentError() {
  return (
    <section className="not-found">
      <h1>Unable to Load Agent</h1>
      <p>There was a problem retrieving this agent&apos;s records.</p>
      <Link href="/" role="button">
        Return to Reception
      </Link>
    </section>
  );
}
