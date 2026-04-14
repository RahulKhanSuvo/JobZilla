import { useState, useMemo } from "react";
import { type Activity, DUMMY_ACTIVITIES } from "./types";
import ActivityFilters from "./components/ActivityFilters";
import ActivityTable from "./components/ActivityTable";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>(DUMMY_ACTIVITIES);
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

  const handleResolve = (id: string) => {
    setActivities((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isResolved: true } : a)),
    );
  };

  const handleArchive = (id: string) => {
    setActivities((prev) => prev.filter((a) => a.id !== id));
  };

  const handleViewDetails = (activity: Activity) => {
    alert(
      `Activity Details:\n\nAction: ${activity.action}\nUser: ${activity.user.name}\nTimestamp: ${new Date(activity.timestamp).toLocaleString()}\nDetails: ${activity.details || "No additional details."}`,
    );
  };

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
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Activity Logs
        </h1>
        <p className="text-muted-foreground">
          Monitor system events, audit admin actions, and resolve security
          alerts.
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

      <ActivityTable
        activities={filteredActivities}
        onResolve={handleResolve}
        onArchive={handleArchive}
        onViewDetails={handleViewDetails}
      />
    </div>
  );
}
