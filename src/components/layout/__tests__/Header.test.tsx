import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  it("renders the clinic branding", () => {
    render(<Header />);
    expect(screen.getByText("AgentClinic")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    render(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});