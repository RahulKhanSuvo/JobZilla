import { Skeleton } from "@/components/ui/skeleton";

export default function StatsCardSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="px-6 py-6 flex items-center gap-5 rounded border bg-white dark:bg-[#222]"
                >
                    {/* Icon skeleton */}
                    <Skeleton className="size-14 rounded-2xl" />

                    <div className="space-y-2 w-full">
                        {/* Value skeleton */}
                        <Skeleton className="h-6 w-16" />

                        {/* Label skeleton */}
                        <Skeleton className="h-4 w-24" />
                    </div>
                </div>
            ))}
        </div>
    );
}