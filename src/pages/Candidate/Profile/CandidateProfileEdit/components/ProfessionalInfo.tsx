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

export default function ProfessionalInfo() {
  const { control } = useFormContext<ProfileFormData>();

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
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <TagInput
                  label="Languages"
                  value={field.value || []}
                  onChange={field.onChange}
                  placeholder="Type a language and press Enter (e.g. English, French)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </CommonWrapper>
  );
}
