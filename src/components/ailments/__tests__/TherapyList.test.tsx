import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TherapyList, { type LinkedTherapy } from "../TherapyList";

const therapies: LinkedTherapy[] = [
  { id: 1, name: "Prompt Compression", description: "Reduces strain", duration: 30 },
  { id: 2, name: "Hallucination Suppression", description: "Targets confabulation", duration: 60 },
];

describe("TherapyList component", () => {
  it("renders all therapies with names", () => {
    render(<TherapyList therapies={therapies} />);
    expect(screen.getByText("Prompt Compression")).toBeInTheDocument();
    expect(screen.getByText("Hallucination Suppression")).toBeInTheDocument();
  });

  it("renders therapy descriptions", () => {
    render(<TherapyList therapies={therapies} />);
    expect(screen.getByText("Reduces strain")).toBeInTheDocument();
    expect(screen.getByText("Targets confabulation")).toBeInTheDocument();
  });

  it("renders duration when present", () => {
    render(<TherapyList therapies={therapies} />);
    expect(screen.getByText("30 min session")).toBeInTheDocument();
    expect(screen.getByText("60 min session")).toBeInTheDocument();
  });

  it("links each therapy to its detail page", () => {
    render(<TherapyList therapies={therapies} />);
    const links = screen.getAllByRole("link");
    const hrefs = links.map((l) => l.getAttribute("href")).sort();
    expect(hrefs).toEqual(["/therapies/1", "/therapies/2"]);
  });

  it("shows empty message when no therapies", () => {
    render(<TherapyList therapies={[]} />);
    expect(
      screen.getByText("No therapies linked to this ailment yet.")
    ).toBeInTheDocument();
  });

  it("omits duration when null", () => {
    const noDur: LinkedTherapy[] = [
      { id: 1, name: "X", description: "Y", duration: null },
    ];
    const { container } = render(<TherapyList therapies={noDur} />);
    expect(container.querySelector(".therapy-duration")).toBeNull();
  });
});
