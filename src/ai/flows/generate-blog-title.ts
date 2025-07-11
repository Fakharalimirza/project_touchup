
'use server';

/**
 * @fileOverview An AI flow to generate blog post titles.
 *
 * - generateTitleFlow - A function that generates blog titles based on a topic and constraints.
 * - GenerateTitleInput - The input type for the flow.
 * - GeneratedTitle - The output type for a single generated title.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateTitleInputSchema = z.object({
  topic: z.string().describe('The main topic or idea for the blog post.'),
  constraints: z.array(z.string()).optional().describe('A list of rules or constraints the title must follow.'),
});
export type GenerateTitleInput = z.infer<typeof GenerateTitleInputSchema>;

const GeneratedTitleSchema = z.object({
    title: z.string().describe('The generated blog post title.'),
    meetsConstraints: z.boolean().describe('Whether this title successfully meets all the provided constraints.'),
    reasoning: z.string().describe('A brief explanation of why the title is effective and how it meets (or fails to meet) the constraints.')
});
export type GeneratedTitle = z.infer<typeof GeneratedTitleSchema>;

const GenerateTitleOutputSchema = z.array(GeneratedTitleSchema);

const generateTitlesPrompt = ai.definePrompt({
    name: 'generateTitlesPrompt',
    input: { schema: GenerateTitleInputSchema },
    output: { schema: GenerateTitleOutputSchema },
    prompt: `You are an expert copywriter specializing in creating compelling, SEO-friendly blog post titles for a home maintenance company in Dubai called "TouchUp Hub".
    
    Your task is to generate 5 distinct and creative blog titles based on the provided topic.

    Topic:
    "{{topic}}"

    {{#if constraints}}
    The titles MUST adhere to the following constraints:
    {{#each constraints}}
    - {{this}}
    {{/each}}
    {{/if}}

    For each generated title, you must evaluate whether it meets all the given constraints.
    - If it meets all constraints, set "meetsConstraints" to true.
    - If it fails to meet even one constraint, set "meetsConstraints" to false.
    
    Also, provide a brief reasoning for each title, explaining its strengths (e.g., why it's catchy, good for SEO) and explicitly stating how it adheres to or violates the constraints.
    `,
});

export const generateTitleFlow = ai.defineFlow(
  {
    name: 'generateTitleFlow',
    inputSchema: GenerateTitleInputSchema,
    outputSchema: GenerateTitleOutputSchema,
  },
  async (input) => {
    const { output } = await generateTitlesPrompt(input);
    return output || [];
  }
);
