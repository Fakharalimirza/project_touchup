
import { genkit, type GenkitError } from 'genkit';
import { googleAI } from 'genkit/googleai';

const googleApiKey = process.env.GOOGLE_API_KEY;
if (!googleApiKey) {
  const err = new Error(
    'GOOGLE_API_KEY environment variable not found. Please provide it either in a .env file or as a secret.'
  ) as GenkitError;
  err.name = 'StartupError';
  throw err;
}

export const ai = genkit({
  plugins: [
    googleAI({
      apiKey: googleApiKey,
    }),
  ],
});
