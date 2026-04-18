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
      </div>
    </CommonWrapper>
  );
}
