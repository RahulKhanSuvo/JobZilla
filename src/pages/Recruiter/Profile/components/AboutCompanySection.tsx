import CommonWrapper from "@/components/common/CommonWrapper";
import SectionTitle from "@/components/common/SectionTitle";
import RichTextEditor from "@/components/common/RichTextEditor";
import { FieldError } from "@/components/ui/field";
import { Controller, type UseFormReturn } from "react-hook-form";
import type { RecruiterProfileFormData } from "../recruiterProfileSchema";

interface AboutCompanySectionProps {
  form: UseFormReturn<RecruiterProfileFormData>;
}

export default function AboutCompanySection({
  form,
}: AboutCompanySectionProps) {
  return (
    <CommonWrapper className="p-8 space-y-8">
      <SectionTitle size={"sm"}>About Company</SectionTitle>
      <Controller
        name="aboutCompany"
        control={form.control}
        render={({ field }) => (
          <RichTextEditor
            value={field.value}
            onChange={field.onChange}
            placeholder="Start typing..."
          />
        )}
      />
      <FieldError>{form.formState.errors.aboutCompany?.message}</FieldError>
    </CommonWrapper>
  );
}
