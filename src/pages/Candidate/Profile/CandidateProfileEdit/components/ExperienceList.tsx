import { type FC, useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Edit2, PlusCircle, Trash2, X } from "lucide-react";
import type { ProfileFormData } from "../../profileSchema";

type ExperienceItem = NonNullable<ProfileFormData["experienceList"]>[number];

type FieldState = {
  errors: (string | Error | { message: string })[];
  isTouched: boolean;
  isValid: boolean;
};

interface ExperienceListProps {
  experienceList: ExperienceItem[];
  errors?: Record<string, FieldState>[];
  appendExperience: () => void;
  removeExperience: (index: number) => void;
  setExperienceField: (
    index: number,
    key: keyof ExperienceItem,
    value: string | boolean,
  ) => void;
}

const isBlank = (exp: ExperienceItem) => !exp.jobTitle && !exp.companyName;

const ExperienceList: FC<ExperienceListProps> = ({
  experienceList,
  errors = [],
  appendExperience,
  removeExperience,
  setExperienceField,
}) => {
  const [editingSet, setEditingSet] = useState<Set<number>>(() => {
    const s = new Set<number>();
    experienceList.forEach((exp, i) => {
      if (isBlank(exp)) s.add(i);
    });
    return s;
  });

  const startEditing = (i: number) =>
    setEditingSet((prev) => new Set(prev).add(i));

  const stopEditing = (i: number) => {
    setEditingSet((prev) => {
      const s = new Set(prev);
      s.delete(i);
      return s;
    });
  };

  const handleAppend = () => {
    appendExperience();
    setEditingSet((prev) => new Set(prev).add(experienceList.length));
  };

  const handleRemove = (index: number) => {
    removeExperience(index);
    setEditingSet((prev) => {
      const s = new Set<number>();
      prev.forEach((i) => {
        if (i !== index) s.add(i > index ? i - 1 : i);
      });
      return s;
    });
  };

  return (
    <div className="space-y-6 pt-4 border-t">
      <SectionTitle size="sm">Experience</SectionTitle>
      <div className="space-y-4">
        {experienceList.map((exp, index) => {
          const isEditing = editingSet.has(index);
          const itemErrors = errors[index] || {};

          return (
            <div
              key={index}
              className="rounded-lg border border-border/60 overflow-hidden"
            >
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#F5F5F5] dark:bg-[#1E1E1E]">
                <div className="flex items-center gap-2">
                  <Briefcase className="size-4 text-primary" />
                  <span className="font-semibold text-sm">
                    {exp.jobTitle || `Experience ${index + 1}`}
                  </span>
                  {exp.companyName && (
                    <span className="text-xs text-muted-foreground">
                      @ {exp.companyName}
                    </span>
                  )}
                </div>
                <div className="flex gap-1">
                  {isEditing ? (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => stopEditing(index)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-4" />
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => startEditing(index)}
                      className="text-primary hover:text-primary/80"
                    >
                      <Edit2 className="size-4" />
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => handleRemove(index)}
                    className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>

              {/* ── Read-only summary ── */}
              {!isEditing && !isBlank(exp) && (
                <div className="px-5 py-4 space-y-3 text-sm">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3">
                    {exp.industry && (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Industry
                        </p>
                        <p className="font-medium">{exp.industry}</p>
                      </div>
                    )}
                    {(exp.startData || exp.endData) && (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Duration
                        </p>
                        <p className="font-medium">
                          {exp.startData || "—"} →{" "}
                          {exp.isWorking ? "Present" : exp.endData || "—"}
                        </p>
                      </div>
                    )}
                    {exp.isWorking && (
                      <div className="flex items-center">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          Currently Working
                        </span>
                      </div>
                    )}
                  </div>
                  {exp.Description && (
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">
                        Description
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {exp.Description}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* ── Edit form ── */}
              {isEditing && (
                <div className="px-5 py-5">
                  <FieldGroup className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-2 gap-6">
                      <Field
                        data-invalid={
                          itemErrors.jobTitle?.isTouched &&
                          !itemErrors.jobTitle?.isValid
                        }
                      >
                        <FieldLabel className="font-bold">Job Title</FieldLabel>
                        <Input
                          placeholder="e.g. Software Engineer"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={exp.jobTitle}
                          onChange={(e) =>
                            setExperienceField(
                              index,
                              "jobTitle",
                              e.target.value,
                            )
                          }
                          aria-invalid={
                            itemErrors.jobTitle?.isTouched &&
                            !itemErrors.jobTitle?.isValid
                          }
                        />
                        {itemErrors.jobTitle?.isTouched &&
                          !itemErrors.jobTitle?.isValid && (
                            <FieldError
                              errors={itemErrors.jobTitle?.errors ?? []}
                            />
                          )}
                      </Field>
                      <Field
                        data-invalid={
                          itemErrors.companyName?.isTouched &&
                          !itemErrors.companyName?.isValid
                        }
                      >
                        <FieldLabel className="font-bold">
                          Company Name
                        </FieldLabel>
                        <Input
                          placeholder="Avitex Inc"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={exp.companyName}
                          onChange={(e) =>
                            setExperienceField(
                              index,
                              "companyName",
                              e.target.value,
                            )
                          }
                          aria-invalid={
                            itemErrors.companyName?.isTouched &&
                            !itemErrors.companyName?.isValid
                          }
                        />
                        {itemErrors.companyName?.isTouched &&
                          !itemErrors.companyName?.isValid && (
                            <FieldError
                              errors={itemErrors.companyName?.errors ?? []}
                            />
                          )}
                      </Field>
                    </div>
                    <Field
                      data-invalid={
                        itemErrors.industry?.isTouched &&
                        !itemErrors.industry?.isValid
                      }
                    >
                      <FieldLabel className="font-bold">Industry</FieldLabel>
                      <Input
                        placeholder="e.g. Technology, Finance"
                        className="h-11 border-none shadow-none"
                        variant="withBg"
                        value={exp.industry}
                        onChange={(e) =>
                          setExperienceField(index, "industry", e.target.value)
                        }
                        aria-invalid={
                          itemErrors.industry?.isTouched &&
                          !itemErrors.industry?.isValid
                        }
                      />
                      {itemErrors.industry?.isTouched &&
                        !itemErrors.industry?.isValid && (
                          <FieldError
                            errors={itemErrors.industry?.errors ?? []}
                          />
                        )}
                    </Field>
                    <div className="grid grid-cols-2 gap-6">
                      <Field
                        data-invalid={
                          itemErrors.startData?.isTouched &&
                          !itemErrors.startData?.isValid
                        }
                      >
                        <FieldLabel className="font-bold">
                          Start Date
                        </FieldLabel>
                        <Input
                          type="date"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={exp.startData}
                          onChange={(e) =>
                            setExperienceField(
                              index,
                              "startData",
                              e.target.value,
                            )
                          }
                          aria-invalid={
                            itemErrors.startData?.isTouched &&
                            !itemErrors.startData?.isValid
                          }
                        />
                        {itemErrors.startData?.isTouched &&
                          !itemErrors.startData?.isValid && (
                            <FieldError
                              errors={itemErrors.startData?.errors ?? []}
                            />
                          )}
                      </Field>
                      <Field>
                        <FieldLabel className="font-bold">End Date</FieldLabel>
                        <Input
                          type="date"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={exp.endData}
                          onChange={(e) =>
                            setExperienceField(index, "endData", e.target.value)
                          }
                        />
                      </Field>
                    </div>
                    <Field>
                      <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          className="size-4 accent-primary"
                          checked={exp.isWorking ?? false}
                          onChange={(e) =>
                            setExperienceField(
                              index,
                              "isWorking",
                              e.target.checked,
                            )
                          }
                        />
                        Currently Working Here
                      </label>
                    </Field>
                    <Field>
                      <FieldLabel className="font-bold">Description</FieldLabel>
                      <Textarea
                        placeholder="Write something..."
                        className="min-h-32 border-none shadow-none resize-none bg-[#F5F5F5] dark:bg-[#222222]"
                        value={exp.Description}
                        onChange={(e) =>
                          setExperienceField(
                            index,
                            "Description",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                  </FieldGroup>
                </div>
              )}
            </div>
          );
        })}

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-6 border-dashed border-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
          onClick={handleAppend}
        >
          <PlusCircle className="size-5" />
          <span>Add Another Experience</span>
        </Button>
      </div>
    </div>
  );
};

export default ExperienceList;
