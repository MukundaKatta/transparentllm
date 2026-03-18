import { describe, it, expect } from "vitest";
import { Transparentllm } from "../src/core.js";
describe("Transparentllm", () => {
  it("init", () => { expect(new Transparentllm().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Transparentllm(); await c.search(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Transparentllm(); await c.search(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
