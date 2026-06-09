import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AilmentNotFound from "../not-found";

describe("AilmentNotFound component", () => {
  it("renders not found heading", () => {
    render(<AilmentNotFound />);
    expect(screen.getByText("Ailment Not Found")).toBeInTheDocument();
  });

  it("renders return link to ailments list", () => {
    render(<AilmentNotFound />);
    const btn = screen.getByRole("button", { name: "Return to Ailments List" });
    expect(btn).toHaveAttribute("href", "/ailments");
  });
});
