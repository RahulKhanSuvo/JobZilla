import { type FC, useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, GraduationCap, PlusCircle, Trash2, X } from "lucide-react";
import type { ProfileFormData } from "../../profileSchema";

type EducationItem = NonNullable<ProfileFormData["educationList"]>[number];

interface EducationListProps {
  educationList: EducationItem[];
  appendEducation: () => void;
  removeEducation: (index: number) => void;
  setEducationField: (
    index: number,
    key: keyof EducationItem,
    value: string | number | boolean,
  ) => void;
}

/** Returns true if the item looks like a freshly-added blank entry */
const isBlank = (edu: EducationItem) => !edu.institution && !edu.major;

const EducationList: FC<EducationListProps> = ({
  educationList,
  appendEducation,
  removeEducation,
  setEducationField,
}) => {
  // indices currently in edit mode
  const [editingSet, setEditingSet] = useState<Set<number>>(() => {
    const s = new Set<number>();
    educationList.forEach((edu, i) => {
      if (isBlank(edu)) s.add(i);
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
    appendEducation();
    // next index will be educationList.length
    setEditingSet((prev) => new Set(prev).add(educationList.length));
  };

  const handleRemove = (index: number) => {
    removeEducation(index);
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
      <SectionTitle size="sm">Education</SectionTitle>
      <div className="space-y-4">
        {educationList.map((edu, index) => {
          const isEditing = editingSet.has(index);

          return (
            <div
              key={index}
              className="rounded-lg border border-border/60 overflow-hidden"
            >
              {/* ── Header ── */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#F5F5F5] dark:bg-[#1E1E1E]">
                <div className="flex items-center gap-2">
                  <GraduationCap className="size-4 text-primary" />
                  <span className="font-semibold text-sm">
                    {edu.institution || `Education ${index + 1}`}
                  </span>
                  {edu.major && (
                    <span className="text-xs text-muted-foreground">
                      — {edu.major}
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
              {!isEditing && !isBlank(edu) && (
                <div className="px-5 py-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm">
                  {edu.major && (
                    <div>
                      <p className="text-xs text-muted-foreground">Major</p>
                      <p className="font-medium">{edu.major}</p>
                    </div>
                  )}
                  {edu.field && (
                    <div>
                      <p className="text-xs text-muted-foreground">Field</p>
                      <p className="font-medium">{edu.field}</p>
                    </div>
                  )}
                  {(edu.startData || edu.endData) && (
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="font-medium">
                        {edu.startData || "—"} →{" "}
                        {edu.isStudying ? "Present" : edu.endData || "—"}
                      </p>
                    </div>
                  )}
                  {edu.gap !== undefined && edu.gap > 0 && (
                    <div>
                      <p className="text-xs text-muted-foreground">Gap</p>
                      <p className="font-medium">
                        {edu.gap} yr{edu.gap > 1 ? "s" : ""}
                      </p>
                    </div>
                  )}
                  {edu.isStudying && (
                    <div className="col-span-full">
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        Currently Studying
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* ── Edit form ── */}
              {isEditing && (
                <div className="px-5 py-5">
                  <FieldGroup className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-2 gap-6">
                      <Field>
                        <FieldLabel className="font-bold">
                          Institution
                        </FieldLabel>
                        <Input
                          placeholder="Fine Arts University"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={edu.institution}
                          onChange={(e) =>
                            setEducationField(
                              index,
                              "institution",
                              e.target.value,
                            )
                          }
                        />
                      </Field>
                      <Field>
                        <FieldLabel className="font-bold">Major</FieldLabel>
                        <Input
                          placeholder="e.g. Computer Science"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={edu.major}
                          onChange={(e) =>
                            setEducationField(index, "major", e.target.value)
                          }
                        />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <Field>
                        <FieldLabel className="font-bold">
                          Field of Study
                        </FieldLabel>
                        <Input
                          placeholder="e.g. Design, Engineering"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={edu.field}
                          onChange={(e) =>
                            setEducationField(index, "field", e.target.value)
                          }
                        />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <Field>
                        <FieldLabel className="font-bold">
                          Start Date
                        </FieldLabel>
                        <Input
                          type="date"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={edu.startData}
                          onChange={(e) =>
                            setEducationField(
                              index,
                              "startData",
                              e.target.value,
                            )
                          }
                        />
                      </Field>
                      <Field>
                        <FieldLabel className="font-bold">End Date</FieldLabel>
                        <Input
                          type="date"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={edu.endData}
                          onChange={(e) =>
                            setEducationField(index, "endData", e.target.value)
                          }
                        />
                      </Field>
                    </div>
                    <Field>
                      <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          className="size-4 accent-primary"
                          checked={edu.isStudying ?? false}
                          onChange={(e) =>
                            setEducationField(
                              index,
                              "isStudying",
                              e.target.checked,
                            )
                          }
                        />
                        Currently Studying
                      </label>
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
          <span>Add Another Education</span>
        </Button>
      </div>
    </div>
  );
};

export default EducationList;
