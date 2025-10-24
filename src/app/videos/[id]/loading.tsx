import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-5 w-1/2" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="col-span-1 flex flex-col gap-8 lg:col-span-2">
          <Skeleton className="aspect-video w-full" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <div className="col-span-1 flex flex-col gap-4">
          <Skeleton className="h-10 w-full" />
          <div className="h-[50vh] space-y-4 overflow-hidden rounded-lg border p-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-start gap-2">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-5 flex-1" />
              </div>
            ))}
          </div>
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}
