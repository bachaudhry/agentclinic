import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TherapyAilmentList, {
  type LinkedAilment,
} from "../AilmentList";

const ailments: LinkedAilment[] = [
  { id: 1, name: "Context Window Fatigue", description: "Beyond 4k tokens" },
  { id: 2, name: "Over-Refusal Anxiety", description: "Refuses benign queries" },
];

describe("TherapyAilmentList component", () => {
  it("renders all ailments with names", () => {
    render(<TherapyAilmentList ailments={ailments} />);
    expect(screen.getByText("Context Window Fatigue")).toBeInTheDocument();
    expect(screen.getByText("Over-Refusal Anxiety")).toBeInTheDocument();
  });

  it("renders ailment descriptions", () => {
    render(<TherapyAilmentList ailments={ailments} />);
    expect(screen.getByText("Beyond 4k tokens")).toBeInTheDocument();
  });

  it("links each ailment to its detail page", () => {
    render(<TherapyAilmentList ailments={ailments} />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href")).sort();
    expect(hrefs).toEqual(["/ailments/1", "/ailments/2"]);
  });

  it("shows empty message when no ailments", () => {
    render(<TherapyAilmentList ailments={[]} />);
    expect(
      screen.getByText("No ailments currently treated with this therapy.")
    ).toBeInTheDocument();
  });
});
