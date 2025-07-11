
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Wrench } from 'lucide-react';

export default function AdminPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-6">
          <Wrench className="h-10 w-10 text-primary" />
        </div>
        
        <form>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold font-headline">Admin Login</CardTitle>
              <CardDescription>Access the Touchup Building Maintenance Dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="admin@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled>
                Sign In
              </Button>
            </CardFooter>
          </Card>
        </form>
         <p className="text-center text-sm text-muted-foreground mt-4">
            Admin login is currently disabled pending backend configuration.
        </p>
      </div>
    </div>
  );
}
