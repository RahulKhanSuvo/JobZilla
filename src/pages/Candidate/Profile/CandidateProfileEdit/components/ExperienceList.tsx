import type { FC } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, PlusCircle, Trash2 } from "lucide-react";
import type { ProfileFormData } from "../../profileSchema";

type ExperienceItem = NonNullable<ProfileFormData["experienceList"]>[number];

interface ExperienceListProps {
  experienceList: ExperienceItem[];
  appendExperience: () => void;
  removeExperience: (index: number) => void;
  setExperienceField: (
    index: number,
    key: keyof ExperienceItem,
    value: string | boolean,
  ) => void;
}

const ExperienceList: FC<ExperienceListProps> = ({
  experienceList,
  appendExperience,
  removeExperience,
  setExperienceField,
}) => {
  return (
    <div className="space-y-6 pt-4 border-t">
      <SectionTitle size="sm">Experience</SectionTitle>
      <div className="space-y-8">
        {experienceList.map((exp, index) => (
          <div key={index} className="space-y-6">
            {/* Header bar */}
            <div className="flex items-center justify-between p-4 bg-[#F5F5F5] dark:bg-[#222222]">
              <span className="font-bold">Experience {index + 1}</span>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => removeExperience(index)}
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
                  <FieldLabel className="font-bold">Job Title</FieldLabel>
                  <Input
                    placeholder="e.g. Software Engineer"
                    className="h-11 border-none shadow-none"
                    variant="withBg"
                    value={exp.jobTitle}
                    onChange={(e) =>
                      setExperienceField(index, "jobTitle", e.target.value)
                    }
                  />
                </Field>
                <Field>
                  <FieldLabel className="font-bold">Company Name</FieldLabel>
                  <Input
                    placeholder="Avitex Inc"
                    className="h-11 border-none shadow-none"
                    variant="withBg"
                    value={exp.companyName}
                    onChange={(e) =>
                      setExperienceField(index, "companyName", e.target.value)
                    }
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel className="font-bold">Industry</FieldLabel>
                <Input
                  placeholder="e.g. Technology, Finance"
                  className="h-11 border-none shadow-none"
                  variant="withBg"
                  value={exp.industry}
                  onChange={(e) =>
                    setExperienceField(index, "industry", e.target.value)
                  }
                />
              </Field>

              <div className="grid grid-cols-2 gap-6">
                <Field>
                  <FieldLabel className="font-bold">Start Date</FieldLabel>
                  <Input
                    type="date"
                    className="h-11 border-none shadow-none"
                    variant="withBg"
                    value={exp.startData}
                    onChange={(e) =>
                      setExperienceField(index, "startData", e.target.value)
                    }
                  />
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
                      setExperienceField(index, "isWorking", e.target.checked)
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
                    setExperienceField(index, "Description", e.target.value)
                  }
                />
              </Field>
            </FieldGroup>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 py-6 border-dashed border-2 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors"
          onClick={appendExperience}
        >
          <PlusCircle className="size-5" />
          <span>Add Another Experience</span>
        </Button>
      </div>
    </div>
  );
};

export default ExperienceList;
