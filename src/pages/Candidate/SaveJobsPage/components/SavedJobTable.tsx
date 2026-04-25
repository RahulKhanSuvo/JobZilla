import SavedJobRow, { type Job } from "./SavedJobRow";
import SavedJobSkeleton from "./SavedJobSkeleton";

interface SavedJobTableProps {
  jobs: Job[];
  onView: (id: string) => void;
  onRemove: (id: string) => void;
  isLoading?: boolean;
}

export default function SavedJobTable({
  jobs,
  onView,
  onRemove,
  isLoading,
}: SavedJobTableProps) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded border border-gray-100 dark:border-slate-800 overflow-hidden">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 items-center bg-gray-50/50 dark:bg-slate-800/50 py-4 px-4 border-b border-gray-100 dark:border-slate-800">
        <div className="col-span-6 text-xs font-bold text-gray-400 uppercase tracking-wider">
          Jobs
        </div>
        <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
          Category
        </div>
        <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">
          Date Post
        </div>
        <div className="col-span-2 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
          Action
        </div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SavedJobSkeleton key={i} />)
        ) : jobs.length > 0 ? (
          jobs.map((job) => (
            <SavedJobRow
              key={job.id}
              job={job}
              onView={onView}
              onRemove={onRemove}
            />
          ))
        ) : (
          <div className="py-20 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No saved jobs found.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
