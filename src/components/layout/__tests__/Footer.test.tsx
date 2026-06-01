import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer", () => {
  it("renders copyright", () => {
    render(<Footer />);
    expect(
      screen.getByText("© 2026 AgentClinic. All rights reserved.")
    ).toBeInTheDocument();
  });

  it("renders a footer element", () => {
    render(<Footer />);
    const footer = document.querySelector("footer");
    expect(footer).toBeInTheDocument();
  });
});