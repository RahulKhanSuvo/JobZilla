import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "../ui/input";
import { MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardSearch({ className }: { className?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("searchTerm", searchTerm.trim());
    if (location.trim()) params.set("location", location.trim());

    navigate(`/find-job?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className={cn(
        "flex items-center w-full max-w-[500px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded px-3 py-1.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-sm group",
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
          placeholder="Search jobs, companies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-none shadow-none focus-visible:ring-0 h-8 text-xs sm:text-sm bg-transparent p-0 placeholder:text-slate-400 flex-1"
        />
      </div>

      {/* Shortcut Hint */}
      <div className="hidden lg:flex items-center ml-2 border border-slate-200 dark:border-slate-800 rounded-md px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800/50">
        <span className="text-[10px] font-bold text-slate-400 tracking-tighter uppercase whitespace-nowrap">
          Enter
        </span>
      </div>
      <button type="submit" className="hidden" />
    </form>
  );
}
