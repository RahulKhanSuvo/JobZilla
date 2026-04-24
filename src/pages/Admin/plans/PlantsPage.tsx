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
import PlanStats from "./components/PlanStats";
import PlanTable from "./components/PlanTable";
import PlanFormModal from "./components/PlanFormModal";
import { toast } from "sonner";
import {
  useCreatePlanMutation,
  useGetAllPlansQuery,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} from "@/redux/features/admin/plan.api";
import type { IPlan } from "./planSchema";
import { errorToast } from "@/utils/errorToast";

export default function PlansPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<IPlan | null>(null);

  const { data, isLoading: isFetching } = useGetAllPlansQuery(undefined);
  const [createPlan, { isLoading: isCreating }] = useCreatePlanMutation();
  const [updatePlan, { isLoading: isUpdating }] = useUpdatePlanMutation();
  const [deletePlan] = useDeletePlanMutation();

  const filteredPlans = useMemo(() => {
    const allPlans = data?.data || [];
    return allPlans.filter((plan) => {
      const matchesSearch =
        plan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plan.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? plan.isActive : !plan.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [data?.data, searchQuery, statusFilter]);

  const handleSubmitPlan = async (planData: IPlan) => {
    try {
      if (editingPlan?.id) {
        await updatePlan({ id: editingPlan.id, data: planData }).unwrap();
        toast.success("Plan updated successfully");
      } else {
        await createPlan(planData).unwrap();
        toast.success("Plan created successfully");
      }
      setIsModalOpen(false);
      setEditingPlan(null);
    } catch (error) {
      errorToast(error);
    }
  };

  const handleDeletePlan = async (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this plan? This action cannot be undone.",
      )
    ) {
      try {
        await deletePlan(id).unwrap();
        toast.success("Plan deleted successfully");
      } catch (error) {
        errorToast(error);
      }
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const nextStatus = !currentStatus;
      await updatePlan({ id, data: { isActive: nextStatus } }).unwrap();
      toast.info(`Plan ${nextStatus ? "activated" : "deactivated"}`);
    } catch (error) {
      errorToast(error);
    }
  };

  const handleEditClick = (plan: IPlan) => {
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

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

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
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold rounded px-6 h-11 shadow-lg shadow-slate-200 dark:shadow-none transition-all active:scale-95"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create New Plan
        </Button>
      </div>

      <PlanStats plans={data?.data || []} />

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input
              placeholder="Search plans by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 border-slate-200 focus:ring-primary/20 font-medium rounded transition-all"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[150px] h-10 border-slate-200 font-bold rounded">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="rounded border-slate-100 shadow-xl">
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
                className="h-10 px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-all"
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
        isLoading={isCreating || isUpdating}
        initialData={editingPlan}
        onClose={() => {
          setIsModalOpen(false);
          setEditingPlan(null);
        }}
        onSubmit={handleSubmitPlan}
      />
    </div>
  );
}
