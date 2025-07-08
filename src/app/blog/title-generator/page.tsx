"use client";

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getBlogTitle } from './actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, CheckCircle, XCircle } from 'lucide-react';

const initialState = {
  title: '',
  fitsConstraints: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? 'Generating...' : <> <Sparkles className="mr-2 h-4 w-4" /> Generate Title</>}
    </Button>
  );
}

export default function TitleGeneratorPage() {
  const [state, formAction] = useFormState(getBlogTitle, initialState);

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">AI Blog Title Generator</h1>
          <p className="text-lg text-muted-foreground mt-4">
            Unleash your creativity with AI. Enter keywords and constraints to generate compelling blog titles instantly.
          </p>
        </div>

        <Card>
          <form action={formAction}>
            <CardHeader>
              <CardTitle>Title Generator</CardTitle>
              <CardDescription>Provide some details and let AI do the magic.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords</Label>
                <Input
                  id="keywords"
                  name="keywords"
                  placeholder="e.g., AC maintenance, summer, Dubai"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="constraints">Constraints</Label>
                <Textarea
                  id="constraints"
                  name="constraints"
                  placeholder="e.g., must be under 60 characters, catchy tone"
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>

        {state?.title && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Generated Title</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold font-headline text-primary mb-4">{state.title}</p>
              <div className="flex items-center gap-2">
                <p>Fits constraints:</p>
                {state.fitsConstraints ? (
                  <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                    <CheckCircle className="mr-2 h-4 w-4" /> Yes
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <XCircle className="mr-2 h-4 w-4" /> No
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
