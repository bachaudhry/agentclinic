import Link from "next/link";
import { db } from "@/db";
import { agents, ailments } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function statusClass(status: string | null): string {
  if (!status) return "";
  return `status-${status}`;
}

export const dynamic = "force-dynamic";

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agentId = Number(id);

  const [agent] = await db.select().from(agents).where(eq(agents.id, agentId));

  if (!agent) {
    notFound();
  }

  const agentAilments = await db
    .select()
    .from(ailments)
    .where(eq(ailments.agentId, agentId));

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li>{agent.name}</li>
        </ul>
      </nav>

      <div className="agent-profile">
        <div className="agent-avatar">{getInitials(agent.name ?? "")}</div>
        <div>
          <h1>{agent.name}</h1>
          <span className={`status-badge ${statusClass(agent.status)}`}>
            {agent.status}
          </span>
        </div>
      </div>

      {agent.description && <p>{agent.description}</p>}

      <h2 className="section-title">Ailments</h2>
      {agentAilments.length > 0 ? (
        <ul className="ailment-list">
          {agentAilments.map((ailment) => (
            <li key={ailment.id} className="ailment-item">
              <h4>{ailment.name}</h4>
              {ailment.description && <p>{ailment.description}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No ailments on record.</p>
      )}
    </section>
  );
}
