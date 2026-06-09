import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AilmentCard from "../AilmentCard";

describe("AilmentCard component", () => {
  it("renders ailment name", () => {
    render(
      <AilmentCard
        id={1}
        name="Hallucination Disorder"
        description="Generates false info"
        agentName="GPT-5"
      />
    );
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Hallucination Disorder"
    );
  });

  it("renders patient badge with agent name", () => {
    render(
      <AilmentCard
        id={1}
        name="X"
        description="Y"
        agentName="GPT-5"
      />
    );
    expect(screen.getByText(/1 patient: GPT-5/)).toBeInTheDocument();
  });

  it("renders unassigned badge when agent is null", () => {
    render(
      <AilmentCard
        id={1}
        name="X"
        description="Y"
        agentName={null}
      />
    );
    expect(screen.getByText("Unassigned")).toBeInTheDocument();
  });

  it("renders description", () => {
    render(
      <AilmentCard
        id={1}
        name="X"
        description="A persistent condition"
        agentName="A"
      />
    );
    expect(screen.getByText("A persistent condition")).toBeInTheDocument();
  });

  it("omits description paragraph when null", () => {
    const { container } = render(
      <AilmentCard
        id={1}
        name="X"
        description={null}
        agentName="A"
      />
    );
    expect(container.querySelector(".ailment-description")).toBeNull();
  });

  it("links to ailment detail page", () => {
    render(
      <AilmentCard
        id={42}
        name="X"
        description="Y"
        agentName="A"
      />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/ailments/42");
  });
});

describe("AilmentCard alphabetical grid", () => {
  it("renders all cards in given order with correct card count", () => {
    const ailments = [
      { id: 1, name: "AAA First", description: "a", agentName: "A1" },
      { id: 2, name: "BBB Mid", description: "b", agentName: "A2" },
      { id: 3, name: "CCC Last", description: "c", agentName: "A3" },
    ];
    const { container } = render(
      <div className="ailment-grid">
        {ailments.map((a) => (
          <AilmentCard key={a.id} {...a} />
        ))}
      </div>
    );
    expect(container.querySelectorAll(".ailment-card")).toHaveLength(3);
    expect(screen.getByText("AAA First")).toBeInTheDocument();
    expect(screen.getByText("BBB Mid")).toBeInTheDocument();
    expect(screen.getByText("CCC Last")).toBeInTheDocument();
  });
});
