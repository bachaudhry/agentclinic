import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function AgentCard({ agent }: { agent: { id: number; name: string | null; description: string | null; status: string | null } }) {
  return (
    <a href={`/agents/${agent.id}`} className="agent-card">
      <div className="agent-card-header">
        <div className="agent-avatar">{getInitials(agent.name ?? "")}</div>
        <div>
          <h3 className="agent-name">{agent.name}</h3>
          <span className={`status-badge status-${agent.status}`}>{agent.status}</span>
        </div>
      </div>
      {agent.description && <p className="agent-description">{agent.description}</p>}
    </a>
  );
}

function AgentDetail({ agent, ailments }: { agent: { name: string | null; description: string | null; status: string | null }; ailments: { id: number; name: string | null; description: string | null }[] }) {
  return (
    <div>
      <div className="agent-profile">
        <div className="agent-avatar">{getInitials(agent.name ?? "")}</div>
        <div>
          <h1>{agent.name}</h1>
          <span className={`status-badge status-${agent.status}`}>{agent.status}</span>
        </div>
      </div>
      {agent.description && <p>{agent.description}</p>}
      <h2>Ailments</h2>
      <ul className="ailment-list">
        {ailments.map((a) => (
          <li key={a.id} className="ailment-item">
            <h4>{a.name}</h4>
            {a.description && <p>{a.description}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

describe("AgentCard component", () => {
  const agent = { id: 1, name: "Claude", description: "Helpful assistant", status: "admitted" };

  it("renders agent name", () => {
    render(<AgentCard agent={agent} />);
    expect(screen.getByText("Claude")).toBeInTheDocument();
  });

  it("renders agent initials in avatar", () => {
    render(<AgentCard agent={agent} />);
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("renders status badge", () => {
    render(<AgentCard agent={agent} />);
    expect(screen.getByText("admitted")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<AgentCard agent={agent} />);
    expect(screen.getByText("Helpful assistant")).toBeInTheDocument();
  });

  it("renders link to agent detail", () => {
    render(<AgentCard agent={agent} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/agents/1");
  });
});

describe("AgentDetail component", () => {
  const agent = { name: "GPT-5", description: "OpenAI model", status: "outpatient" };
  const ailments = [
    { id: 1, name: "Hallucination Disorder", description: "Generates false info" },
    { id: 2, name: "Temperature Instability", description: "Wild output swings" },
  ];

  it("renders agent name as heading", () => {
    render(<AgentDetail agent={agent} ailments={ailments} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("GPT-5");
  });

  it("renders agent initials in avatar", () => {
    render(<AgentDetail agent={agent} ailments={ailments} />);
    expect(screen.getByText("G")).toBeInTheDocument();
  });

  it("renders status badge", () => {
    render(<AgentDetail agent={agent} ailments={ailments} />);
    expect(screen.getByText("outpatient")).toBeInTheDocument();
  });

  it("renders linked ailments", () => {
    render(<AgentDetail agent={agent} ailments={ailments} />);
    expect(screen.getByText("Hallucination Disorder")).toBeInTheDocument();
    expect(screen.getByText("Temperature Instability")).toBeInTheDocument();
  });

  it("renders ailment descriptions", () => {
    render(<AgentDetail agent={agent} ailments={ailments} />);
    expect(screen.getByText("Generates false info")).toBeInTheDocument();
  });
});
