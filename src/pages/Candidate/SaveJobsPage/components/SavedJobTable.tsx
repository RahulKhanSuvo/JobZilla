import SavedJobRow, { type Job } from "./SavedJobRow";

interface SavedJobTableProps {
  jobs: Job[];
  onView: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function SavedJobTable({
  jobs,
  onView,
  onRemove,
}: SavedJobTableProps) {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-[1fr_150px_200px_80px] items-center bg-gray-50/50 dark:bg-slate-800/50 py-4 px-4 border-b border-gray-100 dark:border-slate-800">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Jobs
        </div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Category
        </div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Date Post
        </div>
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider text-right">
          Action
        </div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {jobs.length > 0 ? (
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
