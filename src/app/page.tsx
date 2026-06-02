import { db } from "@/db";
import { agents } from "@/db/schema";
import AgentCard from "@/components/agents/AgentCard";

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
          <AgentCard
            key={agent.id}
            id={agent.id}
            name={agent.name}
            description={agent.description}
            status={agent.status}
          />
        ))}
      </div>
    </section>
  );
}
