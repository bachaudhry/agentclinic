import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Main from "../Main";

describe("Main", () => {
  it("renders children", () => {
    render(
      <Main>
        <p>Main content</p>
      </Main>
    );
    expect(screen.getByText("Main content")).toBeInTheDocument();
  });

  it("renders a main element", () => {
    render(
      <Main>
        <span>child</span>
      </Main>
    );
    const main = document.querySelector("main");
    expect(main).toBeInTheDocument();
  });
});