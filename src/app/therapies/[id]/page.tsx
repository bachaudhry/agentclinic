import Link from "next/link";
import { db } from "@/db";
import { ailments, appointments, therapies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { parsePositiveInt } from "@/lib/utils";
import TherapyAilmentList from "@/components/therapies/AilmentList";

export const dynamic = "force-dynamic";

export default async function TherapyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const therapyId = parsePositiveInt(id);

  if (therapyId === null) {
    notFound();
  }

  const therapy = db.query.therapies.findFirst({
    where: eq(therapies.id, therapyId),
  }).sync();

  if (!therapy) {
    notFound();
  }

  const linkedAilments = db
    .selectDistinct({ ailment: ailments })
    .from(appointments)
    .innerJoin(ailments, eq(appointments.agentId, ailments.agentId))
    .where(eq(appointments.therapyId, therapyId))
    .all()
    .map((row) => row.ailment);

  const sortedAilments = [...linkedAilments].sort((a, b) =>
    (a.name ?? "").localeCompare(b.name ?? "")
  );

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/ailments">Ailments</Link></li>
          <li>{therapy.name}</li>
        </ul>
      </nav>

      <hgroup>
        <h1>{therapy.name}</h1>
        {therapy.duration !== null && (
          <p>{therapy.duration} minute session</p>
        )}
      </hgroup>

      {therapy.description && <p>{therapy.description}</p>}

      <h2 className="section-title">Ailments Treated</h2>
      <TherapyAilmentList ailments={sortedAilments} />
    </section>
  );
}
