import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";

export default function HeroSearch() {
  return (
    <form className="flex items-center gap-3 bg-white dark:bg-background p-4 rounded-[5px] shadow-[16px_41px_89px_0_rgba(129,129,129,0.16)] ">
      {/* Job title */}
      <div className="relative flex-1">
        <Search
          className="absolute left-3 text-primary top-1/2 -translate-y-1/2 "
          size={20}
        />
        <Input
          variant="ghost"
          placeholder="Job title or keyword"
          className="pl-10 h-12 border-none shadow-none"
        />
      </div>

      {/* Location */}
      <div className="relative flex-1 ">
        <MapPin
          className="absolute text-primary left-3 top-1/2 -translate-y-1/2"
          size={18}
        />
        <Input
          variant="ghost"
          placeholder="Location"
          className="pl-10 h-12 border-none ring-0 shadow-none"
        />
      </div>

      {/* Search button */}
      <Button className="h-12 px-6 rounded-[3px] flex  min-w-34.25">
        Search
      </Button>
    </form>
  );
}
