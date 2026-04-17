import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFieldArray, useFormContext } from "react-hook-form";
import CommonWrapper from "@/components/common/CommonWrapper";
import SectionTitle from "@/components/common/SectionTitle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import RichTextEditor from "@/components/common/RichTextEditor";
import type { ProfileFormData } from "../../profileSchema";

export default function ExperienceSection() {
  const { control, watch } = useFormContext<ProfileFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experienceList",
  });

  return (
    <CommonWrapper className="p-8 space-y-8 text-neutral-800">
      <div className="flex justify-between items-center">
        <SectionTitle size="sm">Work Experience</SectionTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              jobTitle: "",
              companyName: "",
              industry: "",
              startData: "",
              endData: "",
              isWorking: false,
              Description: "",
            })
          }
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Experience
        </Button>
      </div>

      <div className="space-y-10">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-6 border rounded-xl bg-neutral-100 dark:bg-slate-900/50 relative group"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => remove(index)}
              className="absolute top-4 right-4 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={18} />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={control}
                name={`experienceList.${index}.jobTitle`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Senior Software Engineer"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`experienceList.${index}.companyName`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Google Inc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`experienceList.${index}.industry`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input placeholder="Technology" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 flex items-center space-x-2">
                <FormField
                  control={control}
                  name={`experienceList.${index}.isWorking`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-white dark:bg-slate-900 border transition-all">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Currently Working Here</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <FormField
                  control={control}
                  name={`experienceList.${index}.startData`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`experienceList.${index}.endData`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          disabled={watch(`experienceList.${index}.isWorking`)}
                          className={
                            watch(`experienceList.${index}.isWorking`)
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="md:col-span-2">
                <FormField
                  control={control}
                  name={`experienceList.${index}.Description`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <RichTextEditor
                          placeholder="What were your main responsibilities?"
                          value={field.value || ""}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-xl">
            <p className="text-neutral-400">No work experience added yet.</p>
            <Button
              type="button"
              variant="link"
              onClick={() =>
                append({
                  jobTitle: "",
                  companyName: "",
                  industry: "",
                  startData: "",
                  endData: "",
                  isWorking: false,
                  Description: "",
                })
              }
            >
              Click here to add one.
            </Button>
          </div>
        )}
      </div>
    </CommonWrapper>
  );
}
