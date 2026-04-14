import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, FilterX, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ActivityFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  moduleFilter: string;
  setModuleFilter: (module: string) => void;
  severityFilter: string;
  setSeverityFilter: (severity: string) => void;
  onClearFilters: () => void;
  onExport: () => void;
}

export default function ActivityFilters({
  searchQuery,
  setSearchQuery,
  moduleFilter,
  setModuleFilter,
  severityFilter,
  setSeverityFilter,
  onClearFilters,
  onExport,
}: ActivityFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by action or user..."
          className="pl-10 h-10 border-none shadow-sm bg-white dark:bg-slate-900"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <Select value={moduleFilter} onValueChange={setModuleFilter}>
          <SelectTrigger className="w-[150px] h-10 border-none shadow-sm bg-white dark:bg-slate-900">
            <SelectValue placeholder="All Modules" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Modules</SelectItem>
            <SelectItem value="User">User</SelectItem>
            <SelectItem value="Job">Job</SelectItem>
            <SelectItem value="Company">Company</SelectItem>
            <SelectItem value="Auth">Auth</SelectItem>
            <SelectItem value="System">System</SelectItem>
          </SelectContent>
        </Select>

        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[150px] h-10 border-none shadow-sm bg-white dark:bg-slate-900">
            <SelectValue placeholder="All Severity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Severity</SelectItem>
            <SelectItem value="info">Info</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="critical">Critical</SelectItem>
          </SelectContent>
        </Select>

        {(searchQuery ||
          moduleFilter !== "all" ||
          severityFilter !== "all") && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="h-10 text-muted-foreground hover:text-foreground"
          >
            <FilterX className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}

        <Button
          variant="outline"
          onClick={onExport}
          className="h-10 border-none shadow-sm bg-white dark:bg-slate-900 hover:bg-slate-50"
        >
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
}
