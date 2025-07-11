
'use client';

import * as React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, PlusCircle, Sparkles, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';
import { generateBlogTitle } from './actions';
import { GeneratedTitle } from '@/ai/flows/generate-blog-title';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

const formSchema = z.object({
  topic: z.string().min(5, { message: 'Please enter a topic of at least 5 characters.' }),
  constraints: z.array(z.object({ value: z.string().min(3, { message: 'Constraint must be at least 3 characters.' }) })).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function TitleGeneratorPage() {
  const [generatedTitles, setGeneratedTitles] = React.useState<GeneratedTitle[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: '',
      constraints: [{ value: 'SEO-friendly' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'constraints',
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setGeneratedTitles([]);
    try {
      const result = await generateBlogTitle({
        topic: data.topic,
        constraints: data.constraints?.map(c => c.value) || [],
      });
      if (result) {
        setGeneratedTitles(result);
      } else {
        throw new Error('No titles were generated.');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate titles. Please try again later.',
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-2xl shadow-primary/10">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit mb-4">
              <Sparkles className="w-8 h-8" />
            </div>
            <CardTitle className="text-3xl font-headline">AI Blog Title Generator</CardTitle>
            <CardDescription>Generate catchy and effective titles for your blog posts.</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Blog Post Topic</FormLabel>
                      <FormControl>
                        <Textarea placeholder="e.g., Tips for effective AC maintenance in hot climates" {...field} rows={3} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div>
                  <FormLabel className="text-lg">Constraints (Optional)</FormLabel>
                  <p className="text-sm text-muted-foreground mb-2">Add rules for the AI to follow.</p>
                  <div className="space-y-2">
                    {fields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <FormField
                          control={form.control}
                          name={`constraints.${index}.value`}
                          render={({ field }) => (
                            <FormItem className="flex-grow">
                              <FormControl>
                                <Input {...field} placeholder="e.g., Must include the word 'Dubai'" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ value: '' })}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Constraint
                  </Button>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Generating Titles...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Generate
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        {generatedTitles.length > 0 && (
          <div className="mt-12">
            <Separator />
            <h2 className="text-2xl font-bold text-center my-6">Generated Titles</h2>
            <div className="space-y-4">
              {generatedTitles.map((item, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="p-4 flex items-start gap-4">
                    <div className={`p-2 rounded-full ${item.meetsConstraints ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                      {item.meetsConstraints ? (
                        <ThumbsUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <ThumbsDown className="h-5 w-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold text-lg">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.reasoning}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
