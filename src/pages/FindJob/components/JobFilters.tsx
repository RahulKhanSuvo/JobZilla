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
    <div className="space-y-6 w-full shrink-0 p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm transition-colors">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight -mb-2">
        Filters
      </h3>

      {/* Search */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Keyword Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input
            placeholder="Job title, keywords..."
            className="pl-10 h-11 bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 rounded-xl text-sm focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 transition-all dark:text-slate-200"
          />
        </div>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Location */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 z-10" />
          <Select defaultValue="all">
            <SelectTrigger className="pl-10 h-11 bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 rounded-xl text-sm w-full dark:text-slate-200">
              <SelectValue placeholder="All Location" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
              <SelectItem value="all">All Location</SelectItem>
              <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
              <SelectItem value="vegas">Las Vegas, USA</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
          Job Category
        </label>
        <Select defaultValue="all">
          <SelectTrigger className="h-11 bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 rounded-xl text-sm w-full dark:text-slate-200">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="design">Design</SelectItem>
            <SelectItem value="dev">Development</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-px bg-slate-100 dark:bg-slate-800" />

      {/* Salary Range */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Salary Range
          </label>
        </div>
        <div className="space-y-2">
          <div className="text-sm font-bold text-slate-900 dark:text-slate-200">
            $1,000 - $5,000
          </div>
          <input
            type="range"
            className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            min="1000"
            max="10000"
            step="500"
          />
        </div>
      </div>

      {/* Type & Seniority */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Type
          </label>
          <Select defaultValue="all">
            <SelectTrigger className="h-11 bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 rounded-xl text-sm w-full dark:text-slate-200">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-900 dark:border-slate-800">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
              <SelectItem value="onsite">On-Site</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
            Seniority
          </label>
          <Select defaultValue="all">
            <SelectTrigger className="h-11 bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 rounded-xl text-sm w-full dark:text-slate-200">
              <SelectValue placeholder="Seniority" />
            </SelectTrigger>
            <SelectContent className="dark:bg-slate-900 dark:border-slate-800">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="junior">Junior</SelectItem>
              <SelectItem value="senior">Senior</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <Button
          variant="ghost"
          className="w-full h-11 text-slate-500 dark:text-slate-400 font-bold hover:text-emerald-600 dark:hover:text-emerald-500 transition-colors"
        >
          Clear All
        </Button>
        <Button className="w-full h-11 bg-emerald-600 text-white font-bold hover:bg-emerald-500 rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.2)] transition-all">
          Find Jobs
        </Button>
      </div>
    </div>
  );
}
