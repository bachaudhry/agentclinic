import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AgentProfile from "@/components/agents/AgentProfile";
import AilmentList from "@/components/agents/AilmentList";
import AgentNotFound from "../not-found";

const agent = { name: "GPT-5", description: "OpenAI model", status: "outpatient" };
const ailments = [
  { id: 1, name: "Hallucination Disorder", description: "Generates false info" },
  { id: 2, name: "Temperature Instability", description: "Wild output swings" },
];

describe("AgentProfile component", () => {
  it("renders agent name as heading", () => {
    render(<AgentProfile {...agent} />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("GPT-5");
  });

  it("renders agent initials in avatar", () => {
    render(<AgentProfile {...agent} />);
    expect(screen.getByText("G")).toBeInTheDocument();
  });

  it("renders status badge", () => {
    render(<AgentProfile {...agent} />);
    expect(screen.getByText("outpatient")).toBeInTheDocument();
  });

  it("handles null status gracefully", () => {
    render(<AgentProfile name="Test" description={null} status={null} />);
    const badge = document.querySelector(".status-badge");
    expect(badge?.textContent).toBe("");
  });
});

describe("AilmentList component", () => {
  it("renders linked ailments", () => {
    render(<AilmentList ailments={ailments} />);
    expect(screen.getByText("Hallucination Disorder")).toBeInTheDocument();
    expect(screen.getByText("Temperature Instability")).toBeInTheDocument();
  });

  it("renders ailment descriptions", () => {
    render(<AilmentList ailments={ailments} />);
    expect(screen.getByText("Generates false info")).toBeInTheDocument();
  });

  it("shows empty message when no ailments", () => {
    render(<AilmentList ailments={[]} />);
    expect(screen.getByText("No ailments on record.")).toBeInTheDocument();
  });

  it("omits description when null", () => {
    render(<AilmentList ailments={[{ id: 3, name: "Test Ailment", description: null }]} />);
    expect(screen.getByText("Test Ailment")).toBeInTheDocument();
  });
});

describe("AgentNotFound component", () => {
  it("renders not found heading", () => {
    render(<AgentNotFound />);
    expect(screen.getByText("Agent Not Found")).toBeInTheDocument();
  });

  it("renders return link as button role", () => {
    render(<AgentNotFound />);
    const btn = screen.getByRole("button", { name: "Return to Reception" });
    expect(btn).toHaveAttribute("href", "/");
  });
});
