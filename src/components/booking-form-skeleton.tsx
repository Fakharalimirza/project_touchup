import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BookingFormSkeleton() {
  return (
    <Card>
      <CardContent className="p-6 md:p-8">
        <div className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          
          <div className="space-y-3">
            <Skeleton className="h-4 w-24" />
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
              <div className="flex items-center space-x-3">
                <Skeleton className="h-5 w-5 rounded-full" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
             <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
             <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
               <div className="space-y-1.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
               <div className="space-y-1.5">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-10 w-full" />
              </div>
               <div className="space-y-1.5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
               <div className="space-y-1.5">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-10 w-full" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-20 w-full" />
          </div>

          <div className="flex items-start space-x-3 rounded-md border p-4">
            <Skeleton className="h-4 w-4 mt-1" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-64" />
            </div>
          </div>

          <Skeleton className="h-11 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}
