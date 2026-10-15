/**
 * Lightfast patch. A deployment behind Vercel Deployment Protection answers
 * any request without Vercel credentials with 401, so the CLI cannot reach
 * the API. When VERCEL_AUTOMATION_BYPASS_SECRET is set (in the environment or
 * the working directory's .env, which `loadEnv` loads), send it as the
 * `x-vercel-protection-bypass` header on every request.
 */
export function protectionBypassHeaders(): Record<string, string> {
  const secret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  return secret ? { "x-vercel-protection-bypass": secret } : {};
}
