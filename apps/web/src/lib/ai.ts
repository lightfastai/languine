import { gateway } from "@ai-sdk/gateway";

export const DEFAULT_MODEL = "openai/gpt-4.1";

export function getModel() {
  const slug = process.env.AI_MODEL || DEFAULT_MODEL;
  return gateway(slug);
}

/**
 * Lightfast patch. Provider options sent with every model call. Opus 5.5
 * always thinks and its thinking counts toward the output cap; `low` effort
 * keeps that spend small. Providers other than Anthropic ignore this key.
 */
export const MODEL_PROVIDER_OPTIONS = {
  anthropic: { effort: "low" },
};
