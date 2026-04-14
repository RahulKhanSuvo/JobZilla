import type { FC } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileSkeleton: FC = () => {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8 animate-pulse text-transparent select-none pointer-events-none">
      <Skeleton className="h-10 w-48 mb-8" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="space-y-6 lg:col-span-1">
          <Skeleton className="h-[450px] w-full rounded-2xl" />
          <Skeleton className="h-[300px] w-full rounded-2xl" />
        </div>
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-[250px] w-full rounded-2xl" />
          <Skeleton className="h-[400px] w-full rounded-2xl" />
          <Skeleton className="h-[350px] w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
};

export default ProfileSkeleton;
