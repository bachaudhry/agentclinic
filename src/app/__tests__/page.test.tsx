import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AgentCard from "@/components/agents/AgentCard";

const testAgents = [
  { id: 1, name: "Claude", description: "Helpful assistant", status: "admitted" },
  { id: 2, name: "GPT-5", description: "OpenAI model", status: "outpatient" },
  { id: 3, name: "Llama", description: "Meta model", status: "discharged" },
];

describe("AgentCard component", () => {
  it("renders agent name", () => {
    render(<AgentCard {...testAgents[0]} />);
    expect(screen.getByText("Claude")).toBeInTheDocument();
  });

  it("renders agent initials in avatar", () => {
    render(<AgentCard {...testAgents[0]} />);
    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("renders status badge", () => {
    render(<AgentCard {...testAgents[0]} />);
    expect(screen.getByText("admitted")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(<AgentCard {...testAgents[0]} />);
    expect(screen.getByText("Helpful assistant")).toBeInTheDocument();
  });

  it("renders link to agent detail", () => {
    render(<AgentCard {...testAgents[0]} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/agents/1");
  });

  it("omits description when null", () => {
    render(<AgentCard id={4} name="Test" description={null} status="admitted" />);
    expect(screen.queryByText("Helpful assistant")).not.toBeInTheDocument();
  });
});

describe("AgentCard grid", () => {
  it("renders all agent cards", () => {
    const { container } = render(
      <div className="agent-grid">
        {testAgents.map((a) => <AgentCard key={a.id} {...a} />)}
      </div>
    );
    expect(screen.getByText("Claude")).toBeInTheDocument();
    expect(screen.getByText("GPT-5")).toBeInTheDocument();
    expect(screen.getByText("Llama")).toBeInTheDocument();
    expect(container.querySelectorAll(".agent-card")).toHaveLength(3);
  });
});
