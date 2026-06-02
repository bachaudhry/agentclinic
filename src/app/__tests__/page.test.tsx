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

function AgentGrid({ agents }: { agents: { id: number; name: string | null; description: string | null; status: string | null }[] }) {
  return (
    <section>
      <h1>Welcome to AgentClinic</h1>
      <div className="agent-grid">
        {agents.map((agent) => (
          <a key={agent.id} href={`/agents/${agent.id}`} className="agent-card">
            <div className="agent-card-header">
              <div className="agent-avatar">{getInitials(agent.name ?? "")}</div>
              <div>
                <h3 className="agent-name">{agent.name}</h3>
                <span className={`status-badge status-${agent.status}`}>{agent.status}</span>
              </div>
            </div>
            {agent.description && <p className="agent-description">{agent.description}</p>}
          </a>
        ))}
      </div>
    </section>
  );
}

describe("Home page — Agent Cards", () => {
  const testAgents = [
    { id: 1, name: "Claude", description: "Helpful assistant", status: "admitted" },
    { id: 2, name: "GPT-5", description: "OpenAI model", status: "outpatient" },
    { id: 3, name: "Llama", description: "Meta model", status: "discharged" },
  ];

  it("renders the clinic heading", () => {
    render(<AgentGrid agents={testAgents} />);
    expect(screen.getByText("Welcome to AgentClinic")).toBeInTheDocument();
  });

  it("renders all agent names", () => {
    render(<AgentGrid agents={testAgents} />);
    expect(screen.getByText("Claude")).toBeInTheDocument();
    expect(screen.getByText("GPT-5")).toBeInTheDocument();
    expect(screen.getByText("Llama")).toBeInTheDocument();
  });

  it("renders agent initials in avatars", () => {
    render(<AgentGrid agents={testAgents} />);
    expect(screen.getByText("C")).toBeInTheDocument();
    expect(screen.getByText("G")).toBeInTheDocument();
    expect(screen.getByText("L")).toBeInTheDocument();
  });

  it("renders status badges", () => {
    render(<AgentGrid agents={testAgents} />);
    expect(screen.getByText("admitted")).toBeInTheDocument();
    expect(screen.getByText("outpatient")).toBeInTheDocument();
    expect(screen.getByText("discharged")).toBeInTheDocument();
  });

  it("renders agent descriptions", () => {
    render(<AgentGrid agents={testAgents} />);
    expect(screen.getByText("Helpful assistant")).toBeInTheDocument();
  });

  it("renders links to agent detail pages", () => {
    render(<AgentGrid agents={testAgents} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/agents/1");
    expect(links[1]).toHaveAttribute("href", "/agents/2");
  });
});
