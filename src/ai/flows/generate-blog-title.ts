'use server';

/**
 * @fileOverview An AI agent for generating blog titles based on keywords and constraints.
 *
 * - generateBlogTitle - A function that generates blog titles.
 * - GenerateBlogTitleInput - The input type for the generateBlogTitle function.
 * - GenerateBlogTitleOutput - The return type for the generateBlogTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogTitleInputSchema = z.object({
  keywords: z
    .string()
    .describe('Keywords to include in the blog title, separated by commas.'),
  constraints: z
    .string()
    .describe('Constraints for the blog title, such as length or tone.'),
});
export type GenerateBlogTitleInput = z.infer<typeof GenerateBlogTitleInputSchema>;

const GenerateBlogTitleOutputSchema = z.object({
  title: z.string().describe('The generated blog title.'),
  fitsConstraints: z
    .boolean()
    .describe('Whether the generated title fits the provided constraints.'),
});
export type GenerateBlogTitleOutput = z.infer<typeof GenerateBlogTitleOutputSchema>;

export async function generateBlogTitle(input: GenerateBlogTitleInput): Promise<GenerateBlogTitleOutput> {
  return generateBlogTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBlogTitlePrompt',
  input: {schema: GenerateBlogTitleInputSchema},
  output: {schema: GenerateBlogTitleOutputSchema},
  prompt: `You are an expert blog title generator.

You will generate a blog title based on the provided keywords and constraints.

Keywords: {{{keywords}}}
Constraints: {{{constraints}}}

Does the generated title fit the constraints? Set the fitsConstraints output field appropriately.

Title:`, // Removed 'Output the title here:' prefix
});

const generateBlogTitleFlow = ai.defineFlow(
  {
    name: 'generateBlogTitleFlow',
    inputSchema: GenerateBlogTitleInputSchema,
    outputSchema: GenerateBlogTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
