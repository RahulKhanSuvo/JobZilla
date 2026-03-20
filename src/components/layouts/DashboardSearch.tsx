"use client";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MapPin, Search } from "lucide-react";

export default function DashboardSearch() {
  return (
    <div className="flex items-center border px-2 border-[#E2E8F0] rounded-4xl bg-[#F8FAFC] dark:bg-accent">
      {/* Location Select */}
      <div className="shrink-0 flex gap-4 items-center">
        <MapPin />
        <Select>
          <SelectTrigger className="w-full border-none shadow-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 border border-[#E2E8F0] px-4 py-2.5 text-sm text-gray-700">
            <SelectValue placeholder="Location" />
          </SelectTrigger>
          <SelectContent
            position="popper"
            className="bg-white border border-[#E2E8F0] shadow-md rounded-md z-50 *:data-[slot=select-item-indicator]:hidden"
          >
            <SelectGroup>
              <SelectLabel>Location</SelectLabel>
              <SelectItem
                value="apple"
                className="focus:bg-transparent focus:text-gray-700 cursor-pointer"
              >
                Us{" "}
              </SelectItem>
              <SelectItem
                value="banana"
                className="focus:bg-transparent focus:text-gray-700 cursor-pointer"
              >
                Banana
              </SelectItem>
              <SelectItem
                value="blueberry"
                className="focus:bg-transparent focus:text-gray-700 cursor-pointer"
              >
                Blueberry
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Search Input with Icon */}
      <div className="relative flex-1">
        <Input
          variant="ghost"
          placeholder="Job title, Keyword, Company"
          className="border-none shadow-none focus:ring-0 pr-10 bg-transparent "
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
      </div>
    </div>
  );
}
