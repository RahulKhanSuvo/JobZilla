import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

export default function JobFilters() {
  return (
    <div className="space-y-6 w-full  shrink-0 p-6 bg-[#F5F5F5]">
      {/* Search */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Job title, keywords..."
            className="pl-10 h-11 bg-white border-slate-200 rounded-lg text-sm"
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-900">Location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 z-10" />
          <Select defaultValue="all">
            <SelectTrigger className="pl-10 h-11 bg-white border-slate-200 rounded-lg text-sm w-full">
              <SelectValue placeholder="All Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Location</SelectItem>
              <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
              <SelectItem value="vegas">Las Vegas, USA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-900">Job Category</label>
        <Select defaultValue="all">
          <SelectTrigger className="h-11 bg-white border-slate-200 rounded-lg text-sm w-full">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="dev">Development</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Type */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-900">
          On-Site/Remote
        </label>
        <Select defaultValue="all">
          <SelectTrigger className="h-11 bg-white border-slate-200 rounded-lg text-sm w-full">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="remote">Remote</SelectItem>
            <SelectItem value="onsite">On-Site</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Technology */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-900">Technology</label>
        <Select defaultValue="any">
          <SelectTrigger className="h-11 bg-white border-slate-200 rounded-lg text-sm w-full">
            <SelectValue placeholder="Any Technology" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any Technology</SelectItem>
            <SelectItem value="react">React</SelectItem>
            <SelectItem value="node">Node.js</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Salary Range */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-slate-900">
            Salary:{" "}
            <span className="text-emerald-600 font-bold">$1,000 - $5,000</span>
          </label>
        </div>
        <input
          type="range"
          className="w-full accent-emerald-500 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
          min="1000"
          max="10000"
          step="500"
        />
      </div>

      {/* Distance */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-sm font-bold text-slate-900">
            Distance:{" "}
            <span className="text-emerald-600 font-bold">15 miles</span>
          </label>
        </div>
        <input
          type="range"
          className="w-full accent-emerald-500 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
          min="0"
          max="100"
        />
      </div>

      {/* Posted Anytime */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-900">
          Posted Anytime
        </label>
        <Select defaultValue="anytime">
          <SelectTrigger className="h-11 bg-white border-slate-200 rounded-lg text-sm w-full">
            <SelectValue placeholder="Posted Anytime" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="anytime">Posted Anytime</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Seniority */}
      <div className="space-y-2">
        <label className="text-sm font-bold text-slate-900">
          Seniority Levels
        </label>
        <Select defaultValue="all">
          <SelectTrigger className="h-11 bg-white border-slate-200 rounded-lg text-sm w-full">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="junior">Junior</SelectItem>
            <SelectItem value="senior">Senior</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="pt-4 space-y-3">
        <Button
          variant="outline"
          className="w-full h-11 border-emerald-500 text-emerald-600 font-bold hover:bg-emerald-50"
        >
          Clear Filter
        </Button>
        <Button className="w-full h-11 bg-emerald-600 text-white font-bold hover:bg-emerald-700">
          Find Jobs
        </Button>
      </div>
    </div>
  );
}
