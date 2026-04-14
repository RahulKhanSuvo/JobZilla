import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { X, ListPlus } from "lucide-react";
import type { Plan } from "../types";
import { Switch } from "@/components/ui/switch";

interface PlanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (plan: Partial<Plan>) => void;
  plan?: Plan | null;
}

export default function PlanFormModal({
  isOpen,
  onClose,
  onSubmit,
  plan,
}: PlanFormModalProps) {
  const [formData, setFormData] = useState<Partial<Plan>>(
    plan || {
      name: "",
      price: 0,
      interval: "monthly",
      description: "",
      features: [],
      status: "active",
      popular: false,
    },
  );

  const [featureInput, setFeatureInput] = useState("");

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...(prev.features || []), featureInput.trim()],
      }));
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: (prev.features || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <DialogHeader className="p-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <DialogTitle className="text-xl font-black uppercase tracking-tighter">
            {plan ? "Edit Plan" : "Create New Plan"}
          </DialogTitle>
          <DialogDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {plan
              ? "Update subscription plan details."
              : "Define a new subscription offering for users."}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-[10px] font-black uppercase tracking-widest text-slate-500"
              >
                Plan Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="e.g. Professional"
                className="font-bold border-slate-200 focus:ring-primary/20 transition-all"
                required
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="price"
                className="text-[10px] font-black uppercase tracking-widest text-slate-500"
              >
                Price ($)
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                placeholder="0"
                className="font-bold border-slate-200 focus:ring-primary/20 transition-all"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="interval"
                className="text-[10px] font-black uppercase tracking-widest text-slate-500"
              >
                Billing Interval
              </Label>
              <Select
                value={formData.interval}
                onValueChange={(value: Plan["interval"]) =>
                  setFormData({ ...formData, interval: value })
                }
              >
                <SelectTrigger className="font-bold border-slate-200 h-10">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent className="border-slate-100 shadow-xl rounded-xl">
                  <SelectItem value="monthly" className="font-bold text-sm">
                    Monthly
                  </SelectItem>
                  <SelectItem value="yearly" className="font-bold text-sm">
                    Yearly
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 mt-6">
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Active Status
                </span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase">
                  Visible to users
                </span>
              </div>
              <Switch
                checked={formData.status === "active"}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    status: checked ? "active" : "inactive",
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-[10px] font-black uppercase tracking-widest text-slate-500"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Describe the plan benefits..."
              className="resize-none font-medium text-sm border-slate-200 focus:ring-primary/20 transition-all h-20"
              required
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                Features
              </Label>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase">
                {formData.features?.length || 0} Features
              </div>
            </div>

            <div className="flex gap-2">
              <Input
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), handleAddFeature())
                }
                placeholder="Add a feature..."
                className="font-bold text-sm border-slate-200 focus:ring-primary/20 transition-all"
              />
              <Button
                type="button"
                onClick={handleAddFeature}
                size="icon"
                className="shrink-0 rounded-xl bg-slate-900 hover:bg-slate-800"
              >
                <ListPlus className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
              {formData.features?.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group animate-in slide-in-from-left-2 duration-200"
                >
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {(!formData.features || formData.features.length === 0) && (
                <p className="text-[10px] font-bold text-slate-400 text-center py-4 italic uppercase tracking-widest">
                  No features added yet.
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
            <Switch
              id="popular"
              checked={formData.popular}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, popular: checked })
              }
            />
            <div className="flex flex-col">
              <Label
                htmlFor="popular"
                className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-500"
              >
                Mark as Popular
              </Label>
              <span className="text-[9px] font-bold text-amber-600/70 uppercase">
                Highlights this plan with a badge
              </span>
            </div>
          </div>
        </form>

        <DialogFooter className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="outline"
            onClick={onClose}
            className="font-bold rounded-xl border-slate-300"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-white"
          >
            {plan ? "Save Changes" : "Create Plan"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
