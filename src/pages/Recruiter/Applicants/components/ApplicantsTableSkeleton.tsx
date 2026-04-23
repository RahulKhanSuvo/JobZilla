import { Skeleton } from "@/components/ui/skeleton";

export default function ApplicantsTableSkeleton({
  count = 5,
}: {
  count?: number;
}) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <tr
          key={i}
          className="border-b border-slate-50 last:border-0 hover:bg-slate-50/60 transition-colors"
        >
          {/* Candidate */}
          <td className="px-6 py-5">
            <div className="flex items-center gap-4">
              <Skeleton className="size-12 rounded-full shrink-0" />
              <div className="space-y-2 w-full max-w-[200px]">
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </td>

          {/* Status */}
          <td className="px-6 py-5">
            <Skeleton className="h-6 w-24 rounded-full" />
          </td>

          {/* Applied Date */}
          <td className="px-6 py-5">
            <Skeleton className="h-4 w-24" />
          </td>

          {/* Actions */}
          <td className="px-6 py-5">
            <div className="flex items-center justify-end gap-1.5 flex-wrap">
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="size-9 rounded-lg" />
              <Skeleton className="h-9 w-16 rounded-lg ml-1" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
}
