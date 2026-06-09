import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TherapyNotFound from "../not-found";

describe("TherapyNotFound component", () => {
  it("renders not found heading", () => {
    render(<TherapyNotFound />);
    expect(screen.getByText("Therapy Not Found")).toBeInTheDocument();
  });

  it("renders return link to home", () => {
    render(<TherapyNotFound />);
    const btn = screen.getByRole("button", { name: "Return to Reception" });
    expect(btn).toHaveAttribute("href", "/");
  });
});
