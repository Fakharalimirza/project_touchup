
'use client';

import { useState, useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { login } from './actions';
import { app } from '@/lib/firebase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wrench, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Sign In
    </Button>
  );
}

export default function AdminPage() {
  const [state, formAction] = useFormState(login, undefined);
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const hiddenFormRef = useRef<HTMLFormElement>(null);
  const idTokenRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: state.error,
      });
      setIsSubmitting(false); // Reset submitting state on server error
    }
  }, [state, toast]);

  const handleClientLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const auth = getAuth(app);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      
      // Set the token in the hidden form and submit it
      if (idTokenRef.current && hiddenFormRef.current) {
        idTokenRef.current.value = idToken;
        hiddenFormRef.current.requestSubmit();
      }

    } catch (error: any) {
      const errorMessage = error.message || 'An unknown authentication error occurred.';
      console.error("Client-side login error:", error);
      toast({
        variant: 'destructive',
        title: 'Login Failed',
        description: errorMessage,
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Wrench className="h-10 w-10 text-primary" />
        </div>
        
        {/* Visible Login Form */}
        <form onSubmit={handleClientLogin}>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold font-headline">Admin Login</CardTitle>
              <CardDescription>Access the Touchup Building Maintenance Dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="admin@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={isSubmitting} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </form>

        {/* Hidden form for submitting the token to the server action */}
        <form action={formAction} ref={hiddenFormRef} style={{ display: 'none' }}>
          <input type="hidden" name="idToken" ref={idTokenRef} />
        </form>
      </div>
    </div>
  );
}
