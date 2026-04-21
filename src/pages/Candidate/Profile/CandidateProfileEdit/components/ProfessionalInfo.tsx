import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import CommonWrapper from "@/components/common/CommonWrapper";
import SectionTitle from "@/components/common/SectionTitle";
import RichTextEditor from "@/components/common/RichTextEditor";
import TagInput from "@/components/common/TagInput";
import type { ProfileFormData } from "../../profileSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@/components/ui/combobox";

export default function ProfessionalInfo() {
  const { control } = useFormContext<ProfileFormData>();
  const anchor = useComboboxAnchor();
  const languages = ["English", "Bengali", "Spanish"] as const;
  return (
    <CommonWrapper className="p-8 space-y-8">
      <SectionTitle size="sm">Professional Info</SectionTitle>
      <div className="space-y-6">
        <FormField
          control={control}
          name="aboutMe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Me</FormLabel>
              <FormControl>
                <RichTextEditor
                  placeholder="Tell us about yourself..."
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="skills"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TagInput
                  label="Skills"
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Type a skill and press Enter (e.g. React, Node.js)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="language"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Languages</FormLabel>
                <FormControl>
                  <Combobox
                    multiple
                    autoHighlight
                    items={languages}
                    value={field.value || []}
                    onValueChange={field.onChange}
                  >
                    {/* Input + Chips */}
                    <ComboboxChips ref={anchor} className="w-full">
                      <ComboboxValue>
                        {(values) => (
                          <>
                            {values.map((value: string) => (
                              <ComboboxChip key={value}>{value}</ComboboxChip>
                            ))}
                            <ComboboxChipsInput placeholder="Select languages..." />
                          </>
                        )}
                      </ComboboxValue>
                    </ComboboxChips>

                    {/* Dropdown */}
                    <ComboboxContent anchor={anchor}>
                      <ComboboxEmpty>No language found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormField
            control={control}
            name="preferredJobType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Job Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Job Type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                    <SelectItem value="REMOTE">Remote</SelectItem>
                    <SelectItem value="HYBRID">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="preferredCareerLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Career Level</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Career Level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ENTRY_LEVEL">Entry Level</SelectItem>
                    <SelectItem value="MID_LEVEL">Mid Level</SelectItem>
                    <SelectItem value="SENIOR_LEVEL">Senior Level</SelectItem>
                    <SelectItem value="EXECUTIVE_LEVEL">
                      Executive Level
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="preferredCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="TECHNOLOGY">Technology</SelectItem>
                    <SelectItem value="DESIGN">Design</SelectItem>
                    <SelectItem value="MARKETING">Marketing</SelectItem>
                    <SelectItem value="SALES">Sales</SelectItem>
                    <SelectItem value="FINANCE">Finance</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="OPERATIONS">Operations</SelectItem>
                    <SelectItem value="CUSTOMER_SUPPORT">
                      Customer Support
                    </SelectItem>
                    <SelectItem value="EDUCATION">Education</SelectItem>
                    <SelectItem value="HEALTHCARE">Healthcare</SelectItem>
                    <SelectItem value="LEGAL">Legal</SelectItem>
                    <SelectItem value="OTHER">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </CommonWrapper>
  );
}
