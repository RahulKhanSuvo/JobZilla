import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import CommonWrapper from "@/components/common/CommonWrapper";

interface MyJobsControlsProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSortChange: (value: string) => void;
}

export default function MyJobsControls({
  searchTerm,
  setSearchTerm,
  handleSortChange,
}: MyJobsControlsProps) {
  return (
    <CommonWrapper className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
      <div className="relative w-full md:max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-12 h-12 bg-slate-50/50 border-none rounded"
        />
      </div>
      <div className="flex items-center gap-3 w-full md:w-auto">
        <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
          Sort by:
        </span>
        <Select defaultValue="newest" onValueChange={handleSortChange}>
          <SelectTrigger className="h-12 border-none bg-slate-50/50 rounded px-4 min-w-[160px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </CommonWrapper>
  );
}
