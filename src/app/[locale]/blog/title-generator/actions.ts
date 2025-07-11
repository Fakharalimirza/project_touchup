
'use server';

import { generateTitleFlow, GenerateTitleInput } from "@/ai/flows/generate-blog-title";

export async function generateBlogTitle(input: GenerateTitleInput) {
  return await generateTitleFlow(input);
}
