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

interface PaymentFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  methodFilter: string;
  setMethodFilter: (method: string) => void;
  onClearFilters: () => void;
  onExport: () => void;
}

export default function PaymentFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  methodFilter,
  setMethodFilter,
  onClearFilters,
  onExport,
}: PaymentFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search Transaction ID or Email..."
          className="pl-10 h-10 border-none shadow bg-white dark:bg-slate-900 overflow-hidden rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] h-10 border-none shadow bg-white dark:bg-slate-900 rounded">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="refunded">Refunded</SelectItem>
          </SelectContent>
        </Select>

        <Select value={methodFilter} onValueChange={setMethodFilter}>
          <SelectTrigger className="w-[160px] h-10 border-none shadow bg-white dark:bg-slate-900 rounded">
            <SelectValue placeholder="All Methods" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            <SelectItem value="Credit Card">Credit Card</SelectItem>
            <SelectItem value="PayPal">PayPal</SelectItem>
            <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
          </SelectContent>
        </Select>

        {(searchQuery || statusFilter !== "all" || methodFilter !== "all") && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            className="h-10 text-muted-foreground hover:text-foreground font-bold"
          >
            <FilterX className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}

        <Button
          variant="outline"
          onClick={onExport}
          className="h-10 border-none shadow bg-white dark:bg-slate-900 hover:bg-slate-50 font-bold px-6"
        >
          <Download className="h-4 w-4 mr-2 text-primary" />
          Export
        </Button>
      </div>
    </div>
  );
}
