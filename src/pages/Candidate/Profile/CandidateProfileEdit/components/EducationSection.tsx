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
import type { ProfileFormData } from "../../profileSchema";

export default function EducationSection() {
  const { control, watch } = useFormContext<ProfileFormData>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "educationList",
  });

  return (
    <CommonWrapper className="p-8 space-y-8 text-slate-800">
      <div className="flex justify-between items-center">
        <SectionTitle size="sm">Education History</SectionTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              institution: "",
              major: "",
              field: "",
              startData: "",
              endData: "",
              isStudying: false,
            })
          }
          className="flex items-center gap-2"
        >
          <Plus size={16} />
          Add Education
        </Button>
      </div>

      <div className="space-y-10">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-6 border rounded bg-neutral-100 dark:bg-slate-900/50 relative group"
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
                name={`educationList.${index}.institution`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution</FormLabel>
                    <FormControl>
                      <Input placeholder="University of Example" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`educationList.${index}.major`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Major</FormLabel>
                    <FormControl>
                      <Input placeholder="Computer Science" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name={`educationList.${index}.field`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Field of Study</FormLabel>
                    <FormControl>
                      <Input placeholder="Engineering" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="md:col-span-2 flex items-center space-x-2">
                <FormField
                  control={control}
                  name={`educationList.${index}.isStudying`}
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-white dark:bg-slate-900 border transition-all">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Currently Studying Here</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4 md:col-span-2">
                <FormField
                  control={control}
                  name={`educationList.${index}.startData`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name={`educationList.${index}.endData`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          {...field}
                          disabled={watch(`educationList.${index}.isStudying`)}
                          className={
                            watch(`educationList.${index}.isStudying`)
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
            </div>
          </div>
        ))}

        {fields.length === 0 && (
          <div className="text-center py-12 border-2 border-dashed rounded-xl">
            <p className="text-neutral-400">No education history added yet.</p>
            <Button
              type="button"
              variant="link"
              onClick={() =>
                append({
                  institution: "",
                  major: "",
                  field: "",
                  startData: "",
                  endData: "",
                  isStudying: false,
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
