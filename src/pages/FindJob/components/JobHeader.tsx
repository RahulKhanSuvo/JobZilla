import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JobHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden p-1">
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-md bg-emerald-50 text-emerald-600"
          >
            <LayoutGrid className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 rounded-md text-slate-400"
          >
            <List className="size-4" />
          </Button>
        </div>
        <p className="text-sm font-semibold text-slate-500">
          <span className="text-slate-900 mr-1">9</span> Result(s) Found
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Select defaultValue="12">
          <SelectTrigger className="h-10 bg-white border-slate-200 rounded-lg text-xs w-[120px] shadow-sm">
            <SelectValue placeholder="12 Per Page" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="12">12 Per Page</SelectItem>
            <SelectItem value="24">24 Per Page</SelectItem>
            <SelectItem value="50">50 Per Page</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="default">
          <SelectTrigger className="h-10 bg-white border-slate-200 rounded-lg text-xs w-[140px] shadow-sm">
            <SelectValue placeholder="Sort by (Default)" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Sort by (Default)</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="salary">Salary</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
