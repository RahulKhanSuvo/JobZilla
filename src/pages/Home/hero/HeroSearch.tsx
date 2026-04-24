import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Search } from "lucide-react";

export default function HeroSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set("searchTerm", searchTerm.trim());
    if (location.trim()) params.set("location", location.trim());

    navigate(`/find-job?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex flex-col md:flex-row items-center gap-3 bg-white dark:bg-background p-2 md:p-4 rounded-[5px] shadow-[16px_41px_89px_0_rgba(129,129,129,0.16)] "
    >
      {/* Job title */}
      <div className="relative flex-1 w-full md:w-auto">
        <Search
          className="absolute left-3 text-primary top-1/2 -translate-y-1/2 "
          size={20}
        />
        <Input
          variant="ghost"
          placeholder="Job title or keyword"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 border-none shadow-none"
        />
      </div>

      {/* Location */}
      <div className="relative flex-1 w-full md:w-auto">
        <MapPin
          className="absolute text-primary left-3 top-1/2 -translate-y-1/2"
          size={18}
        />
        <Input
          variant="ghost"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="pl-10 h-12 border-none ring-0 shadow-none"
        />
      </div>

      {/* Search button */}
      <Button
        type="submit"
        className="h-12 px-6 rounded-[3px] flex  min-w-34.25 w-full md:w-auto"
      >
        Search
      </Button>
    </form>
  );
}
