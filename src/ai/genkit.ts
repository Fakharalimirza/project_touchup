
type GenkitError = Error & { name: string };

const googleApiKey = process.env.GOOGLE_API_KEY;

// Lazily initialize Genkit. The blog title-generator AI feature is optional;
// the site must boot without GOOGLE_API_KEY and without the genkit packages installed.
// Only throw when `ai` is actually used.
let _ai: unknown = null;

function getAi(): unknown {
  if (!_ai) {
    if (!googleApiKey) {
      const err = new Error(
        'GOOGLE_API_KEY environment variable not found. Please provide it either in a .env file or as a secret. AI features are disabled.'
      ) as unknown as GenkitError;
      (err as Error).name = 'StartupError';
      throw err;
    }
    // Dynamic requires so the app can run even when genkit packages are not installed
    // (static site mode). This is only executed when AI is actually used.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { genkit } = require('genkit') as { genkit: (opts: unknown) => unknown };
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { googleAI } = require('@genkit-googleai') as { googleAI: (opts: unknown) => unknown };
    _ai = (genkit as (opts: object) => unknown)({
      plugins: [
        (googleAI as (opts: object) => unknown)({
          apiKey: googleApiKey,
        }),
      ],
    });
  }
  return _ai;
}

// Export a proxy so existing `import { ai } from '@/ai/genkit'` continues to work
// but does not crash at module load time when the key or packages are absent.
// Using `unknown` avoids needing the package types at build time when not installed.
export const ai: unknown = new Proxy({} as Record<string, unknown>, {
  get(_target, prop) {
    const instance = getAi() as Record<string, unknown>;
    const value = instance[prop as string];
    return typeof value === 'function' ? (value as (...args: unknown[]) => unknown).bind(instance) : value;
  },
});

// Helper to check if AI is configured without throwing
export function isAiConfigured(): boolean {
  return !!googleApiKey;
}
