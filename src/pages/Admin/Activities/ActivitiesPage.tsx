import { useState, useMemo } from "react";
import { DUMMY_ACTIVITIES } from "./types";
import ActivityFilters from "./components/ActivityFilters";
import ActivityTable from "./components/ActivityTable";

export default function ActivitiesPage() {
  const activities = DUMMY_ACTIVITIES;
  const [searchQuery, setSearchQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");

  const filteredActivities = useMemo(() => {
    return activities.filter((activity) => {
      const matchesSearch =
        activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.user.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesModule =
        moduleFilter === "all" || activity.module === moduleFilter;
      const matchesSeverity =
        severityFilter === "all" || activity.severity === severityFilter;

      return matchesSearch && matchesModule && matchesSeverity;
    });
  }, [activities, searchQuery, moduleFilter, severityFilter]);

  const handleExport = () => {
    alert("Exporting activity logs to CSV format... (Simulated)");
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setModuleFilter("all");
    setSeverityFilter("all");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1 pb-4">
        <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-slate-100 uppercase italic">
          Activity Logs
        </h1>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
          <div className="h-1 w-1 rounded-full bg-primary" />
          Real-time stream of system events and audit records
        </p>
      </div>

      <ActivityFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        moduleFilter={moduleFilter}
        setModuleFilter={setModuleFilter}
        severityFilter={severityFilter}
        setSeverityFilter={setSeverityFilter}
        onClearFilters={handleClearFilters}
        onExport={handleExport}
      />

      <ActivityTable activities={filteredActivities} />
    </div>
  );
}
