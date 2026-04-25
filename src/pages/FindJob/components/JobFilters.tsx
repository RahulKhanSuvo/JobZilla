import { Controller, type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Briefcase,
  BriefcaseBusiness,
  Tags,
} from "lucide-react";
import { Field } from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import type { JobFilterValues } from "./jobFilterSchema";

interface JobFiltersProps {
  form: UseFormReturn<JobFilterValues>;
}

export default function JobFilters({ form }: JobFiltersProps) {
  const { register, control, reset } = form;

  return (
    <div className="space-y-6 sticky top-20 w-full shrink-0 p-6 bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 transition-colors">
      {/* Search Company */}
      <Field className="space-y-2">
        <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Search Jobs
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <Input
            {...register("searchTerm")}
            placeholder="Job title, keywords..."
            className="pl-10 h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-none text-sm focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 transition-all dark:text-slate-200 border-2"
          />
        </div>
      </Field>

      {/* Location */}
      <Field className="space-y-2">
        <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Location
        </label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 z-10 transition-colors" />
          <Input
            {...register("location")}
            placeholder="City, state, or zip..."
            className="pl-10 h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-none text-sm focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 transition-all dark:text-slate-200 border-2"
          />
        </div>
      </Field>

      {/* Job Category */}
      <Field className="space-y-2">
        <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Job Category
        </label>
        <div className="relative">
          <BriefcaseBusiness className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 z-10" />
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="pl-10 h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-none text-sm w-full dark:text-slate-200 border-2">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
                >
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="TECHNOLOGY">Technology</SelectItem>
                  <SelectItem value="DESIGN">Design</SelectItem>
                  <SelectItem value="MARKETING">Marketing</SelectItem>
                  <SelectItem value="SALES">Sales</SelectItem>
                  <SelectItem value="FINANCE">Finance</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="OPERATIONS">Operations</SelectItem>
                  <SelectItem value="CUSTOMER_SUPPORT">
                    Customer Support
                  </SelectItem>
                  <SelectItem value="EDUCATION">Education</SelectItem>
                  <SelectItem value="HEALTHCARE">Healthcare</SelectItem>
                  <SelectItem value="LEGAL">Legal</SelectItem>
                  <SelectItem value="OTHER">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </Field>

      {/* Job Type */}
      <Field className="space-y-2">
        <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Job Type
        </label>
        <div className="relative">
          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 z-10" />
          <Controller
            name="jobType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="pl-10 h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-none text-sm w-full dark:text-slate-200 border-2">
                  <SelectValue placeholder="All Job Types" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
                >
                  <SelectItem value="all">All Job Types</SelectItem>
                  <SelectItem value="FULL_TIME">Full Time</SelectItem>
                  <SelectItem value="PART_TIME">Part Time</SelectItem>
                  <SelectItem value="CONTRACT">Contract</SelectItem>
                  <SelectItem value="INTERN">Intern</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </Field>

      {/* On-Site/Remote */}
      <Field className="space-y-2">
        <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Job Location Type
        </label>
        <div className="relative">
          <Tags className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 z-10" />
          <Controller
            name="locationType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="pl-10 h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-none text-sm w-full dark:text-slate-200 border-2">
                  <SelectValue placeholder="All Location Types" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
                >
                  <SelectItem value="all">All Location Types</SelectItem>
                  <SelectItem value="REMOTE">Remote</SelectItem>
                  <SelectItem value="ON_SITE">On-Site</SelectItem>
                  <SelectItem value="HYBRID">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </Field>

      {/* Salary Range */}
      <Field className="space-y-6">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Salary Range
          </label>
          <span className="text-xs font-bold px-2 py-1 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-500 rounded">
            Full-time / Yearly
          </span>
        </div>

        <Controller
          name="salary"
          control={control}
          render={({ field }) => (
            <div className="space-y-4 px-1">
              <Slider
                min={0}
                max={200000}
                step={1000}
                value={field.value}
                onValueChange={field.onChange}
                className="py-4"
              />
              <div className="flex items-center justify-between gap-4">
                <div className="flex-1 p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-0.5">
                    Min
                  </p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    ${field.value[0]?.toLocaleString()}
                  </p>
                </div>
                <div className="flex-1 p-2 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded text-center">
                  <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-0.5">
                    Max
                  </p>
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    ${field.value[1]?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        />
      </Field>
      {/* Posted Anytime */}
      <Field className="space-y-2">
        <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Posted Anytime
        </label>
        <Controller
          name="postedAnytime"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-none text-sm w-full dark:text-slate-200 border-2">
                <SelectValue placeholder="Posted Anytime" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
              >
                <SelectItem value="anytime">Posted Anytime</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Past Week</SelectItem>
                <SelectItem value="month">Past Month</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      {/* Seniority Levels */}
      <Field className="space-y-2">
        <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Seniority Levels
        </label>
        <Controller
          name="seniorityLevel"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-none text-sm w-full dark:text-slate-200 border-2">
                <SelectValue placeholder="All Levels" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
              >
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="ENTRY_LEVEL">Entry Level</SelectItem>
                <SelectItem value="MID_LEVEL">Mid Level</SelectItem>
                <SelectItem value="SENIOR_LEVEL">Senior Level</SelectItem>
                <SelectItem value="EXECUTIVE_LEVEL">Executive Level</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      <div className="pt-4 space-y-4">
        <Button
          type="button"
          onClick={() => reset()}
          variant="outline"
          className="w-full h-12 border-emerald-500 text-emerald-600 dark:text-emerald-500 font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-all rounded-none border-2 shadow-sm"
        >
          Clear Filter
        </Button>
        <Button className="w-full h-12 bg-emerald-500 text-white font-bold hover:bg-emerald-600 rounded-none transition-all border-none shadow-md shadow-emerald-500/20 active:scale-95">
          Find Jobs
        </Button>
      </div>
    </div>
  );
}
