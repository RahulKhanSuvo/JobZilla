import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search, Loader2 } from "lucide-react";
import { useGetAllJobsQuery } from "@/redux/features/job/job.api";

export default function HeroSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();
  const suggestionRef = useRef<HTMLDivElement>(null);

  // Fetch jobs for suggestions when searchTerm has at least 2 characters
  const { data, isFetching } = useGetAllJobsQuery(
    { searchTerm, limit: 5 },
    { skip: searchTerm.length < 2 },
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
    <div className="relative w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="flex flex-col md:flex-row items-center gap-3 bg-white dark:bg-slate-900 p-2 md:p-4 rounded-[5px] shadow-[16px_41px_89px_0_rgba(129,129,129,0.16)] border border-slate-100 dark:border-slate-800"
      >
        {/* Job title with Suggestions */}
        <div className="relative flex-1 w-full md:w-auto overflow-visible">
          <Search
            className="absolute left-3 text-primary top-1/2 -translate-y-1/2 z-10"
            size={20}
          />
          <Input
            variant="ghost"
            placeholder="Job title or keyword"
            value={searchTerm}
            onFocus={() => setShowSuggestions(true)}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowSuggestions(true);
            }}
            className="pl-10 h-12 border-none shadow-none focus-visible:ring-0"
          />
          {isFetching && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 animate-spin text-slate-400" />
          )}

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              ref={suggestionRef}
              className="absolute top-[calc(100%+12px)] left-0 w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg shadow-xl z-[100] py-2 overflow-hidden animate-in fade-in zoom-in duration-200"
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

        {/* Location */}
        <div className="relative flex-1 w-full md:w-auto">
          <MapPin
            className="absolute text-primary left-3 top-1/2 -translate-y-1/2"
            size={18}
          />
          <Input
            variant="ghost"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10 h-12 border-none ring-0 shadow-none focus-visible:ring-0"
          />
        </div>

        {/* Search button */}
        <Button
          type="submit"
          className="h-12 px-6 rounded-[3px] flex min-w-34.25 w-full md:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-bold transition-all shadow-md shadow-emerald-500/20 active:scale-95"
        >
          Search
        </Button>
      </form>
    </div>
  );
}
