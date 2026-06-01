import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../page";

describe("Home page", () => {
  it("renders the clinic heading", () => {
    render(<Home />);
    expect(screen.getByText("Welcome to AgentClinic")).toBeInTheDocument();
  });

  it("renders the subtitle", () => {
    render(<Home />);
    expect(
      screen.getByText("A clinic for evaluating and improving AI agents")
    ).toBeInTheDocument();
  });
});