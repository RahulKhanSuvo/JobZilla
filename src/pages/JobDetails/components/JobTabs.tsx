import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const tabs = [
  { id: "about", label: "About" },
  { id: "jobs", label: "Openings (2)" },
];

interface JobTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function JobTabs({ activeTab, setActiveTab }: JobTabsProps) {
  return (
    <div className="flex border-b border-slate-200 dark:border-slate-800 mb-4 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "px-2 py-4 text-[15px] font-bold transition-all relative mr-8",
            activeTab === tab.id
              ? "text-slate-900 dark:text-white"
              : "text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300",
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full"
            />
          )}
        </button>
      ))}
    </div>
  );
}
