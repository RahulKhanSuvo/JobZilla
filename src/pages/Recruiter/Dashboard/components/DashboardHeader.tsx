import { Search, Bell, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

export function DashboardHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 px-6 bg-linear-to-r from-primary to-primary/80 rounded-xl text-white shadow-xl shadow-primary/10 mb-8">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-1"
      >
        <h1 className="text-3xl font-bold tracking-tight">
          Recruiter Dashboard
        </h1>
        <p className="text-white/80 font-medium font-lato">
          Welcome back, Sarah! Here's what's happening today.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <div className="relative group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/60 group-focus-within:text-white transition-colors" />
          <Input
            placeholder="Search candidates..."
            className="w-[240px] pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-offset-0 focus-visible:ring-white/30 rounded-lg"
          />
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full hover:bg-white/10 text-white"
        >
          <Bell className="size-5" />
        </Button>
        <Button className="bg-white text-primary hover:bg-white/90 rounded-lg px-6 font-bold shadow-lg shadow-white/10 border-none">
          <Plus className="size-4 mr-2 stroke-[3px]" />
          Post Job
        </Button>
      </motion.div>
    </div>
  );
}
