import type { FC } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, PlusCircle, Trash2 } from "lucide-react";
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

const EducationList: FC<EducationListProps> = ({
  educationList,
  appendEducation,
  removeEducation,
  setEducationField,
}) => {
  return (
    <div className="space-y-6 pt-4 border-t">
      <SectionTitle size="sm">Education</SectionTitle>
      <div className="space-y-8">
        {educationList.map((edu, index) => (
          <div key={index} className="space-y-6">
            {/* Header bar */}
            <div className="flex items-center justify-between p-4 bg-[#F5F5F5] dark:bg-[#222222]">
              <span className="font-bold">Education {index + 1}</span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeEducation(index)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                >
                  <Trash2 className="size-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon-sm">
                  <Edit2 className="size-4" />
                </Button>
              </div>
            </div>

            <FieldGroup className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-2 gap-6">
                <Field>
                  <FieldLabel className="font-bold">Institution</FieldLabel>
                  <Input
                    placeholder="Fine Arts University"
                    className="h-11 border-none shadow-none"
                    variant="withBg"
                    value={edu.institution}
                    onChange={(e) =>
                      setEducationField(index, "institution", e.target.value)
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
                  <FieldLabel className="font-bold">Field of Study</FieldLabel>
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
                <Field>
                  <FieldLabel className="font-bold">Gap (years)</FieldLabel>
                  <Input
                    placeholder="0"
                    type="number"
                    min={0}
                    className="h-11 border-none shadow-none"
                    variant="withBg"
                    value={edu.gap ?? 0}
                    onChange={(e) =>
                      setEducationField(index, "gap", Number(e.target.value))
                    }
                  />
                </Field>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Field>
                  <FieldLabel className="font-bold">Start Date</FieldLabel>
                  <Input
                    type="date"
                    className="h-11 border-none shadow-none"
                    variant="withBg"
                    value={edu.startData}
                    onChange={(e) =>
                      setEducationField(index, "startData", e.target.value)
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
                      setEducationField(index, "isStudying", e.target.checked)
                    }
                  />
                  Currently Studying
                </label>
              </Field>
            </FieldGroup>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-6 border-dashed border-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
          onClick={appendEducation}
        >
          <PlusCircle className="size-5" />
          <span>Add Another Education</span>
        </Button>
      </div>
    </div>
  );
};

export default EducationList;
