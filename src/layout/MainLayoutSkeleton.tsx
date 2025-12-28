import { Skeleton } from "../components/ui/skeleton";

const MainLayoutSkeleton = () => {
  return (
    <div className="flex min-h-svh w-full bg-background">
      {/* Sidebar (desktop) */}
      <aside className="hidden md:flex w-64 border-r border-border flex-col">
        <div className="h-16 border-b border-border flex items-center px-4 gap-3">
          <Skeleton className="h-9 w-9 rounded-md" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        <div className="flex-1 p-4 space-y-3">
          <Skeleton className="h-4 w-24" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
            <Skeleton className="h-9 w-full" />
          </div>
        </div>

        <div className="border-t border-border p-4 space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-40" />
            </div>
          </div>
          <Skeleton className="h-9 w-full" />
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-border flex items-center px-6 justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Skeleton className="h-9 w-9 rounded-md md:hidden" />
            <Skeleton className="h-4 w-56" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>

        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-4">
            <Skeleton className="h-8 w-52" />
            <Skeleton className="h-28 w-full" />
            <div className="grid gap-4 md:grid-cols-3">
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-24 w-full" />
            </div>
            <Skeleton className="h-60 w-full" />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayoutSkeleton;
