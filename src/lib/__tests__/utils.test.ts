import { describe, it, expect } from "vitest";
import { getInitials, statusClass, parsePositiveInt } from "../utils";

describe("getInitials", () => {
  it("extracts first letter of each word", () => {
    expect(getInitials("Claude")).toBe("C");
    expect(getInitials("Command R+")).toBe("CR");
  });

  it("limits to 2 characters", () => {
    expect(getInitials("Very Long Name Here")).toBe("VL");
  });

  it("handles empty string", () => {
    expect(getInitials("")).toBe("");
  });

  it("handles single character", () => {
    expect(getInitials("A")).toBe("A");
  });

  it("uppercases output", () => {
    expect(getInitials("claude")).toBe("C");
  });
});

describe("statusClass", () => {
  it("returns correct class for admitted", () => {
    expect(statusClass("admitted")).toBe("status-admitted");
  });

  it("returns empty string for null", () => {
    expect(statusClass(null)).toBe("");
  });

  it("sanitizes special characters", () => {
    expect(statusClass("admitted foo")).toBe("status-admittedfoo");
  });

  it("returns empty string when sanitized is empty", () => {
    expect(statusClass("!!!")).toBe("");
  });
});

describe("parsePositiveInt", () => {
  it("parses valid positive integers", () => {
    expect(parsePositiveInt("1")).toBe(1);
    expect(parsePositiveInt("42")).toBe(42);
  });

  it("rejects non-numeric strings", () => {
    expect(parsePositiveInt("abc")).toBeNull();
  });

  it("rejects empty string", () => {
    expect(parsePositiveInt("")).toBeNull();
  });

  it("rejects floats", () => {
    expect(parsePositiveInt("1.5")).toBeNull();
  });

  it("rejects negative numbers", () => {
    expect(parsePositiveInt("-1")).toBeNull();
  });

  it("rejects zero", () => {
    expect(parsePositiveInt("0")).toBeNull();
  });

  it("rejects scientific notation", () => {
    expect(parsePositiveInt("1e2")).toBeNull();
  });
});
