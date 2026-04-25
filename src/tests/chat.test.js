import { describe, it, expect } from "vitest";
import { getAssistantReply, sanitizeInput } from "../utils/chat";

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

describe("Chat fallback replies", () => {
  it("maps the 'what is a voter ID' prompt to the voter ID explanation", async () => {
    const reply = await getAssistantReply(
      "What is a Voter ID?",
      { voterType: "first-time", language: "English" },
      "voterId",
    );

    expect(reply).toContain("EPIC card");
    expect(reply).not.toContain("Driving License");
  });

  it("maps the 'bring to vote' prompt to the ID guidance", async () => {
    const reply = await getAssistantReply(
      "What do I bring to vote?",
      { voterType: "first-time", language: "English" },
      "bring",
    );

    expect(reply).toContain("Photo ID");
    expect(reply).toContain("Driving License");
  });

  it("recognizes document-style phrasing without an explicit intent", async () => {
    const reply = await getAssistantReply(
      "What documents should I carry to vote?",
      { voterType: "first-time", language: "English" },
    );

    expect(reply).toContain("Photo ID");
  });

  it("gives experienced voters a change summary instead of the generic timeline", async () => {
    const reply = await getAssistantReply(
      "What changed since last election?",
      { voterType: "experienced", language: "English" },
      "changes",
    );

    expect(reply).toContain("M3 EVM");
    expect(reply).not.toContain("Announcement of Schedule");
  });

  it("gives experienced voters the updated EVM guidance", async () => {
    const reply = await getAssistantReply(
      "New EVM rules?",
      { voterType: "experienced", language: "English" },
      "evm",
    );

    expect(reply).toContain("M3 EVM");
    expect(reply).not.toContain("very simple to use");
  });

  it("gives senior citizens the priority queue answer", async () => {
    const reply = await getAssistantReply(
      "Do I get priority at the booth?",
      { voterType: "senior", language: "English" },
      "seniorPriority",
    );

    expect(reply).toContain("priority entry");
    expect(reply).not.toContain("Entrance check");
  });

  it("gives senior citizens the home voting answer", async () => {
    const reply = await getAssistantReply(
      "Can I vote from home?",
      { voterType: "senior", language: "English" },
      "seniorHomeVoting",
    );

    expect(reply).toContain("Form 12D");
    expect(reply).toContain("85 years");
  });

  it("gives accessibility users the booth access answer", async () => {
    const reply = await getAssistantReply(
      "Is my booth wheelchair accessible?",
      { voterType: "accessible", language: "English" },
      "accessibleBooth",
    );

    expect(reply).toContain("wheelchair access");
    expect(reply).toContain("ramps");
  });

  it("gives accessibility users the companion voting answer", async () => {
    const reply = await getAssistantReply(
      "Can someone help me vote?",
      { voterType: "accessible", language: "English" },
      "accessibleCompanion",
    );

    expect(reply).toContain("companion or family member");
    expect(reply).not.toContain("Braille markings");
  });

  it("gives accessibility users the Braille EVM answer", async () => {
    const reply = await getAssistantReply(
      "What is Braille EVM?",
      { voterType: "accessible", language: "English" },
      "accessibleBrailleEvm",
    );

    expect(reply).toContain("Braille markings");
    expect(reply).toContain("vote independently");
  });
});
