import { db } from "@/db";
import { fetchAllAilmentsWithAgent } from "@/db/queries";
import AilmentCard from "@/components/ailments/AilmentCard";

export const dynamic = "force-dynamic";

export default async function AilmentsPage() {
  const allAilments = fetchAllAilmentsWithAgent(db);

  const sorted = [...allAilments].sort((a, b) =>
    (a.name ?? "").localeCompare(b.name ?? "")
  );

  return (
    <section>
      <hgroup>
        <h1>Ailments on Record</h1>
        <p>Every condition our agents have presented with</p>
      </hgroup>

      <div className="ailment-grid">
        {sorted.map((ailment) => (
          <AilmentCard
            key={ailment.id}
            id={ailment.id}
            name={ailment.name}
            description={ailment.description}
            agentName={ailment.agent?.name ?? null}
          />
        ))}
      </div>
    </section>
  );
}
