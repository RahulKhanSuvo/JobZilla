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
import { Search, MapPin } from "lucide-react";
import { Field } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
          Search Company
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
          <Input
            {...register("searchTerm")}
            placeholder="Job title, key words or company"
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
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="pl-10 h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-none text-sm w-full dark:text-slate-200 border-2">
                  <SelectValue placeholder="All Location" />
                </SelectTrigger>
                <SelectContent
                  position="popper"
                  className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
                >
                  <SelectItem value="all">All Location</SelectItem>
                  <SelectItem value="tokyo">Tokyo, Japan</SelectItem>
                  <SelectItem value="vegas">Las Vegas, USA</SelectItem>
                  <SelectItem value="bangladesh">Bangladesh</SelectItem>
                  <SelectItem value="dhaka">Dhaka, Bangladesh</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </Field>

      {/* Job Category */}
      <Field className="space-y-2">
        <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Job Category
        </label>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-none text-sm w-full dark:text-slate-200 border-2">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
              >
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="dev">Development</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      {/* On-Site/Remote */}
      <Field className="space-y-2">
        <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
          On-Site/Remote
        </label>
        <Controller
          name="jobType"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="h-11 bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 rounded-none text-sm w-full dark:text-slate-200 border-2">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent
                position="popper"
                className="dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200"
              >
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="onsite">On-Site</SelectItem>
                <SelectItem value="hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </Field>

      {/* Salary Range */}
      <Field className="space-y-3">
        <label className="text-sm font-bold text-slate-900 dark:text-slate-100">
          Salary:{" "}
          <span className="text-emerald-500 font-bold ml-1">Range Filter</span>
        </label>
        <div className="space-y-2.5">
          <Controller
            name="salary"
            control={control}
            render={({ field }) => (
              <>
                {[
                  { id: "s1", label: "$0 - $5,000" },
                  { id: "s2", label: "$5,000 - $10,000" },
                  { id: "s3", label: "$10,000 - $15,000" },
                  { id: "s4", label: "$15,000 - $20,000" },
                  {
                    id: "s5",
                    label: "more then $20,000",
                  },
                ].map((range) => (
                  <div
                    key={range.id}
                    className="flex items-center space-x-3 group cursor-pointer"
                  >
                    <Checkbox
                      id={range.id}
                      checked={field.value?.includes(range.id)}
                      onCheckedChange={(checked) => {
                        const currentValues = new Set(field.value || []);
                        if (checked) {
                          currentValues.add(range.id);
                        } else {
                          currentValues.delete(range.id);
                        }
                        field.onChange(Array.from(currentValues));
                      }}
                      className="border-slate-300 dark:border-slate-700 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500 transition-colors"
                    />
                    <Label
                      htmlFor={range.id}
                      className="text-sm font-medium text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 cursor-pointer transition-colors"
                    >
                      {range.label}
                    </Label>
                  </div>
                ))}
              </>
            )}
          />
        </div>
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
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="mid">Mid-Level</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
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
