import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "about", label: "About" },
  { id: "job-info", label: "Job info" },
  { id: "reviews", label: "Reviews" },
];

export default function JobTabs() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={cn(
            "px-6 py-4 text-sm font-semibold transition-all relative min-w-max",
            activeTab === tab.id
              ? "text-emerald-600"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200",
          )}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}
