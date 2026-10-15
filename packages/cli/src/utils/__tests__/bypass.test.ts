import { afterEach, describe, expect, test } from "bun:test";
import { protectionBypassHeaders } from "../bypass.js";

const original = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

afterEach(() => {
  if (original === undefined) delete process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  else process.env.VERCEL_AUTOMATION_BYPASS_SECRET = original;
});

describe("protectionBypassHeaders", () => {
  test("sends nothing when the secret is unset", () => {
    delete process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
    expect(protectionBypassHeaders()).toEqual({});
  });

  test("sends the bypass header when the secret is set", () => {
    process.env.VERCEL_AUTOMATION_BYPASS_SECRET = "test-value";
    expect(protectionBypassHeaders()).toEqual({
      "x-vercel-protection-bypass": "test-value",
    });
  });
});
