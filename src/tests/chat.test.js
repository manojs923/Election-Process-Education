import { describe, it, expect } from "vitest";

function sanitizeInput(input) {
  return input.replace(/[<>]/g, "");
}

describe("Chat Sanitization", () => {
  it("removes script tags", () => {
    const input = "<script>alert(1)</script>";
    const output = sanitizeInput(input);
    expect(output).not.toContain("<");
  });

  it("keeps normal text", () => {
    const input = "Hello election";
    const output = sanitizeInput(input);
    expect(output).toBe("Hello election");
  });
});
