import Link from "next/link";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { parsePositiveInt } from "@/lib/utils";
import AgentProfile from "@/components/agents/AgentProfile";
import AilmentList from "@/components/agents/AilmentList";

export const dynamic = "force-dynamic";

export default async function AgentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const agentId = parsePositiveInt(id);

  if (agentId === null) {
    notFound();
  }

  const agent = db.query.agents.findFirst({
    where: eq(agents.id, agentId),
    with: { ailments: true },
  }).sync();

  if (!agent) {
    notFound();
  }

  return (
    <section>
      <nav aria-label="breadcrumb">
        <ul>
          <li><Link href="/">Home</Link></li>
          <li>{agent.name}</li>
        </ul>
      </nav>

      <AgentProfile
        name={agent.name}
        description={agent.description}
        status={agent.status}
      />

      {agent.description && <p>{agent.description}</p>}

      <h2 className="section-title">Ailments</h2>
      <AilmentList ailments={agent.ailments} />
    </section>
  );
}
