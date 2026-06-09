import Link from "next/link";
import { db } from "@/db";
import { ailments, appointments, therapies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { parsePositiveInt } from "@/lib/utils";
import TherapyList from "@/components/ailments/TherapyList";

export const dynamic = "force-dynamic";

export default async function AilmentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ailmentId = parsePositiveInt(id);

  if (ailmentId === null) {
    notFound();
  }

  const ailment = db.query.ailments.findFirst({
    where: eq(ailments.id, ailmentId),
    with: { agent: true },
  }).sync();

  if (!ailment) {
    notFound();
  }

  const linkedTherapies =
    ailment.agentId !== null
      ? db
          .selectDistinct({ therapy: therapies })
          .from(appointments)
          .innerJoin(therapies, eq(appointments.therapyId, therapies.id))
          .where(eq(appointments.agentId, ailment.agentId))
          .all()
          .map((row) => row.therapy)
      : [];

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/ailments">Ailments</Link></li>
          <li>{ailment.name}</li>
        </ul>
      </nav>

      <hgroup>
        <h1>{ailment.name}</h1>
        {ailment.agent && (
          <p>
            Diagnosed in: <Link href={`/agents/${ailment.agent.id}`}>{ailment.agent.name}</Link>
          </p>
        )}
      </hgroup>

      {ailment.description && <p>{ailment.description}</p>}

      <h2 className="section-title">Linked Therapies</h2>
      <TherapyList therapies={linkedTherapies} />
    </section>
  );
}
