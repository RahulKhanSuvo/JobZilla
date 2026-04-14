import { useState, useMemo } from "react";
import { Plus, Search, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Plan, DUMMY_PLANS } from "./types";
import PlanStats from "./components/PlanStats";
import PlanTable from "./components/PlanTable";
import PlanFormModal from "./components/PlanFormModal";
import { toast } from "sonner";

export default function PlansPage() {
  const [plans, setPlans] = useState<Plan[]>(DUMMY_PLANS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  const filteredPlans = useMemo(() => {
    return plans.filter((plan) => {
      const matchesSearch =
        plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || plan.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [plans, searchQuery, statusFilter]);

  const handleCreatePlan = (planData: Partial<Plan>) => {
    const newPlan: Plan = {
      ...planData,
      id: `plan_${Date.now()}`,
      createdAt: new Date().toISOString(),
    } as Plan;

    setPlans((prev) => [newPlan, ...prev]);
    toast.success("Plan created successfully");
  };

  const handleUpdatePlan = (planData: Partial<Plan>) => {
    if (!editingPlan) return;
    setPlans((prev) =>
      prev.map((p) => (p.id === editingPlan.id ? { ...p, ...planData } : p)),
    );
    toast.success("Plan updated successfully");
  };

  const handleDeletePlan = (id: string) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      setPlans((prev) => prev.filter((p) => p.id !== id));
      toast.success("Plan deleted successfully");
    }
  };

  const handleToggleStatus = (id: string, currentStatus: Plan["status"]) => {
    const nextStatus = currentStatus === "active" ? "inactive" : "active";
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: nextStatus } : p)),
    );
    toast.info(`Plan ${nextStatus === "active" ? "activated" : "deactivated"}`);
  };

  const handleEditClick = (plan: Plan) => {
    setEditingPlan(plan);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingPlan(null);
    setIsModalOpen(true);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-slate-100 uppercase italic">
            Subscription Plans
          </h1>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-primary" />
            Manage platform offerings and pricing strategies
          </p>
        </div>
        <Button
          onClick={handleAddClick}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl px-6 h-11 shadow-lg shadow-slate-200 dark:shadow-none transition-all active:scale-95"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create New Plan
        </Button>
      </div>

      <PlanStats plans={plans} />

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search plans by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 border-slate-200 focus:ring-primary/20 font-medium rounded-xl transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px] h-10 border-slate-200 font-bold rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                <SelectItem value="all" className="font-bold">
                  All Status
                </SelectItem>
                <SelectItem value="active" className="font-bold text-green-600">
                  Active
                </SelectItem>
                <SelectItem
                  value="inactive"
                  className="font-bold text-slate-400"
                >
                  Inactive
                </SelectItem>
              </SelectContent>
            </Select>

            {(searchQuery || statusFilter !== "all") && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="h-10 px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              >
                <FilterX className="mr-2 h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>

        <PlanTable
          plans={filteredPlans}
          onEdit={handleEditClick}
          onDelete={handleDeletePlan}
          onToggleStatus={handleToggleStatus}
        />
      </div>

      <PlanFormModal
        key={editingPlan?.id || (isModalOpen ? "new" : "closed")}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={editingPlan ? handleUpdatePlan : handleCreatePlan}
        plan={editingPlan}
      />
    </div>
  );
}
