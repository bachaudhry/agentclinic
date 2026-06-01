import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Layout from "../Layout";

describe("Layout", () => {
  it("renders header, main, and footer", () => {
    render(
      <Layout>
        <p>Page content</p>
      </Layout>
    );
    expect(screen.getByText("AgentClinic")).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
    expect(
      screen.getByText("© 2026 AgentClinic. All rights reserved.")
    ).toBeInTheDocument();
  });

  it("renders children inside main", () => {
    render(
      <Layout>
        <p>child content</p>
      </Layout>
    );
    const main = document.querySelector("main");
    expect(main).toContainElement(screen.getByText("child content"));
  });
});