import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../ui/input";
import { MapPin, Search, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAllJobsQuery } from "@/redux/features/job/job.api";

export default function DashboardSearch({ className }: { className?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Fetch jobs for suggestions when searchTerm has at least 2 characters
  const { data, isFetching } = useGetAllJobsQuery(
    { searchTerm, limit: 5 },
    { skip: searchTerm.length < 2 || !showSuggestions },
  );

  const suggestions = data?.data || [];

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("searchTerm", searchTerm.trim());
    if (location.trim()) params.set("location", location.trim());

    setShowSuggestions(false);
    navigate(`/find-job?${params.toString()}`);
  };

  const handleSuggestionClick = (title: string) => {
    setSearchTerm(title);
    const params = new URLSearchParams();
    params.set("searchTerm", title);
    if (location.trim()) params.set("location", location.trim());

    setShowSuggestions(false);
    navigate(`/find-job?${params.toString()}`);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1 max-w-[500px]">
      <form
        onSubmit={handleSearch}
        className={cn(
          "flex items-center w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-sm group",
          className,
        )}
      >
        {/* Location Input */}
        <div className="flex items-center gap-1 border-r border-slate-200 dark:border-slate-800 pr-2 mr-2 shrink-0 max-w-[120px] sm:max-w-[150px]">
          <MapPin className="size-4 text-slate-400 group-focus-within:text-primary transition-colors shrink-0" />
          <Input
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border-none shadow-none focus-visible:ring-0 h-8 text-xs sm:text-sm bg-transparent p-0 placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* Search Input */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <Search className="size-4 text-slate-400 shrink-0 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search jobs..."
            value={searchTerm}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            className="border-none shadow-none focus-visible:ring-0 h-8 text-xs sm:text-sm bg-transparent p-0 placeholder:text-slate-400 flex-1"
          />
          {isFetching && (
            <Loader2 className="size-3 animate-spin text-slate-400" />
          )}
        </div>

        {/* Shortcut Hint */}
        <div className="hidden lg:flex items-center ml-2 border border-slate-200 dark:border-slate-800 rounded-md px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800/50">
          <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase whitespace-nowrap">
            Enter
          </span>
        </div>
        <button type="submit" className="hidden" />
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionRef}
          className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg shadow-xl z-100 py-2 overflow-hidden animate-in fade-in zoom-in duration-200"
        >
          <p className="px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-50 dark:border-slate-800/50 mb-1">
            Suggested Jobs
          </p>
          {suggestions.map((job, index) => (
            <button
              key={job.id || index}
              type="button"
              onClick={() => handleSuggestionClick(job.title)}
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-700 dark:text-slate-300 transition-colors group"
            >
              <Search className="size-3.5 text-slate-300 group-hover:text-primary transition-colors" />
              <span className="truncate">{job.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
