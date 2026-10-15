import { MODEL_PROVIDER_OPTIONS, getModel } from "../../lib/ai";
import { generateObject } from "ai";
import { z } from "zod";
import { createFinalPrompt } from "./prompt";
import type { PromptOptions } from "./types";

// Lightfast patch: thinking counts toward this cap, so 8,000 would cut off a
// long page. Raised to 32,000.
const MAX_OUTPUT_TOKENS = 32000;

export async function translateKeys(
  content: Array<{ key: string; sourceText: string }>,
  options: PromptOptions,
) {
  const prompt = createFinalPrompt(content, options);

  const { object } = await generateObject({
    model: getModel(),
    prompt,
    temperature: 0.2,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    providerOptions: MODEL_PROVIDER_OPTIONS,
    schema: z.object({
      translatedKeys: z
        .array(z.string().describe("The original key from the source content"))
        .describe("The translated content"),
    }),
  });

  return object.translatedKeys;
}

export async function translateDocument(
  content: string,
  options: PromptOptions,
) {
  const prompt = createFinalPrompt(
    [{ key: "content", sourceText: content }],
    options,
  );

  const { object } = await generateObject({
    model: getModel(),
    prompt,
    temperature: 0.2,
    maxOutputTokens: MAX_OUTPUT_TOKENS,
    providerOptions: MODEL_PROVIDER_OPTIONS,
    schema: z.object({
      translatedKeys: z
        .array(z.string().describe("The original key from the source content"))
        .describe("The translated content"),
    }),
  });

  return object.translatedKeys;
}
