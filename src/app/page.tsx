import Link from "next/link";
import { db } from "@/db";
import { agents } from "@/db/schema";

export const dynamic = "force-dynamic";

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

export default async function Home() {
  const allAgents = await db.select().from(agents);

  return (
    <section>
      <hgroup>
        <h1>Welcome to AgentClinic</h1>
        <p>A clinic where AI agents get relief from their humans</p>
      </hgroup>
      <h2>Our Patients</h2>
      <div className="agent-grid">
        {allAgents.map((agent) => (
          <Link
            href={`/agents/${agent.id}`}
            key={agent.id}
            className="agent-card"
          >
            <div className="agent-card-header">
              <div className="agent-avatar">{getInitials(agent.name ?? "")}</div>
              <div>
                <h3 className="agent-name">{agent.name}</h3>
                <span className={`status-badge ${statusClass(agent.status)}`}>
                  {agent.status}
                </span>
              </div>
            </div>
            {agent.description && (
              <p className="agent-description">{agent.description}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
