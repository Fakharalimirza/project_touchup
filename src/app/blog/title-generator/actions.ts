'use server';

import { generateBlogTitle, type GenerateBlogTitleInput } from '@/ai/flows/generate-blog-title';
import { z } from 'zod';

const formSchema = z.object({
  keywords: z.string(),
  constraints: z.string(),
});

export async function getBlogTitle(prevState: any, formData: FormData) {
  try {
    const validatedData = formSchema.parse({
      keywords: formData.get('keywords'),
      constraints: formData.get('constraints'),
    });
    
    const result = await generateBlogTitle(validatedData as GenerateBlogTitleInput);
    return result;
  } catch (error) {
    console.error(error);
    return {
      title: 'An error occurred.',
      fitsConstraints: false,
    }
  }
}
