import Link from "next/link";
import { db } from "@/db";
import { fetchAilmentsForTherapy, fetchTherapyById } from "@/db/queries";
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

  const therapy = fetchTherapyById(db, therapyId);

  if (!therapy) {
    notFound();
  }

  const linkedAilments = fetchAilmentsForTherapy(db, therapyId);

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
