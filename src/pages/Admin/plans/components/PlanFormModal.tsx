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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm, useWatch } from "react-hook-form";
import { PlanSchema, type IPlan } from "../planSchema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { ListPlus, Loader2, X } from "lucide-react";

interface PlanFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (plan: IPlan) => void;
  isLoading: boolean;
  initialData?: IPlan | null;
}

export default function PlanFormModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  initialData,
}: PlanFormModalProps) {
  const [featureInput, setFeatureInput] = useState("");

  const form = useForm<IPlan>({
    resolver: zodResolver(PlanSchema.createPlanSchema),
    defaultValues: initialData || {
      name: "",
      price: 0,
      billingInterval: "MONTHLY",
      description: "",
      features: [],
      isActive: true,
      isHighlight: false,
      currency: "USD",
      maxPostings: 0,
    },
  });

  const features = useWatch({
    control: form.control,
    name: "features",
  });

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      const currentFeatures = form.getValues("features") || [];
      const newFeatures = [...currentFeatures, featureInput.trim()];
      form.setValue("features", newFeatures, {
        shouldValidate: true, // Trigger validation
        shouldDirty: true,
      });
      setFeatureInput("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    const currentFeatures = form.getValues("features") || [];
    const newFeatures = currentFeatures.filter((_, i) => i !== index);
    form.setValue("features", newFeatures, {
      shouldValidate: true, // Trigger validation
      shouldDirty: true,
    });
  };

  const handleSubmit = (data: IPlan) => {
    onSubmit(data);
  };

  // Get the error state for features
  // const featuresError = form.formState.errors.features;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none shadow-2xl rounded-2xl">
        <DialogHeader className="p-6 bg-slate-50 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
          <DialogTitle className="text-xl font-black uppercase tracking-tighter">
            {initialData ? "Update Plan" : "Create New Plan"}
          </DialogTitle>
          <DialogDescription className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Define a new subscription offering for users.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Plan Name</FieldLabel>
                    <Input
                      id={field.name}
                      {...field}
                      placeholder="e.g. Professional"
                      className="font-bold border-slate-200 focus:ring-primary/20 transition-all"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="space-y-2">
              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Price ($)</FieldLabel>
                    <Input
                      id={field.name}
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                      placeholder="e.g. 29.99"
                      className="font-bold border-slate-200 focus:ring-primary/20 transition-all"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Controller
                name="billingInterval"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Billing Interval
                    </FieldLabel>
                    <Select
                      value={field.value}
                      name={field.name}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        className="font-bold border-slate-200 h-10"
                      >
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent className="border-slate-100 shadow-xl rounded">
                        <SelectItem
                          value="MONTHLY"
                          className="font-bold text-sm"
                        >
                          Monthly
                        </SelectItem>
                        <SelectItem
                          value="YEARLY"
                          className="font-bold text-sm"
                        >
                          Yearly
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="space-y-2">
              <Controller
                name="currency"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Currency</FieldLabel>
                    <Select
                      value={field.value}
                      name={field.name}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        aria-invalid={fieldState.invalid}
                        className="font-bold border-slate-200 h-10"
                      >
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent className="border-slate-100 shadow-xl rounded">
                        <SelectItem value="USD" className="font-bold text-sm">
                          USD
                        </SelectItem>
                        <SelectItem value="BDT" className="font-bold text-sm">
                          BDT
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="space-y-2">
              <Controller
                name="maxPostings"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={!!fieldState.invalid}>
                    <FieldLabel htmlFor="maxPostings">Max Postings</FieldLabel>
                    <Input
                      id="maxPostings"
                      type="number"
                      {...field}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                      aria-invalid={fieldState.invalid}
                      placeholder="e.g. 10"
                      className="font-medium text-sm border-slate-200 focus:ring-primary/20 transition-all"
                      required
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 p-3 rounded bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
            <Controller
              name="isActive"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.invalid} className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <FieldLabel htmlFor={field.name}>
                        Active Status
                      </FieldLabel>
                    </div>
                    <Switch
                      id={field.name}
                      name={field.name}
                      checked={field.value}
                      aria-invalid={fieldState.invalid}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="isHighlight"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.invalid} className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <FieldLabel htmlFor={field.name}>
                        Highlight Plan
                      </FieldLabel>
                    </div>
                    <Switch
                      id={field.name}
                      name={field.name}
                      checked={field.value}
                      aria-invalid={fieldState.invalid}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="space-y-2">
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={!!fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    id="description"
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Describe the plan benefits..."
                    className="resize-none font-medium text-sm border-slate-200 focus:ring-primary/20 transition-all h-20"
                    required
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Features section with Controller */}
          <div className="space-y-3">
            <Controller
              name="features"
              control={form.control}
              render={({ fieldState }) => (
                <Field data-invalid={!!fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                      Features
                    </FieldLabel>
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase">
                      {features?.length || 0} Features
                    </div>
                  </div>

                  <div className="flex gap-2 mt-2">
                    <Input
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), handleAddFeature())
                      }
                      placeholder="Add a feature..."
                      className="font-bold text-sm border-slate-200 focus:ring-primary/20 transition-all"
                    />
                    <Button
                      type="button"
                      onClick={handleAddFeature}
                      size="icon"
                      className="shrink-0 rounded bg-slate-900 hover:bg-slate-800"
                    >
                      <ListPlus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar mt-2">
                    {features?.map((feature, index) => (
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
                    {(!features || features.length === 0) && (
                      <p className="text-[10px] font-bold text-slate-400 text-center py-4 italic uppercase tracking-widest">
                        No features added yet.
                      </p>
                    )}
                  </div>

                  {/* Show validation error for features */}
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          <div className="flex items-center gap-2 p-3 rounded bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30">
            <Controller
              name="isHighlight"
              control={form.control}
              render={({ field }) => (
                <>
                  <Switch
                    id="popular"
                    checked={field.value}
                    onCheckedChange={field.onChange}
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
                </>
              )}
            />
          </div>
        </form>

        <DialogFooter className="p-6 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="font-bold rounded border-slate-300"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(handleSubmit)}
            className="font-bold rounded bg-slate-900 hover:bg-slate-800 text-white"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : initialData ? (
              "Update Plan"
            ) : (
              "Create Plan"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
