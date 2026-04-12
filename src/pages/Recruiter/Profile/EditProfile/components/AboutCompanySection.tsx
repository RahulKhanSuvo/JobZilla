import CommonWrapper from "@/components/common/CommonWrapper";
import SectionTitle from "@/components/common/SectionTitle";
import RichTextEditor from "@/components/common/RichTextEditor";
import { FieldError } from "@/components/ui/field";
import { type FormApi, useField } from "@tanstack/react-form";
import { type ZodValidator } from "@tanstack/zod-form-adapter";
import type { RecruiterProfileFormData } from "../../recruiterProfileSchema";

interface AboutCompanySectionProps {
  form: FormApi<RecruiterProfileFormData, ZodValidator>;
}

export default function AboutCompanySection({
  form,
}: AboutCompanySectionProps) {
  const field = useField({
    form,
    name: "description",
  });

  return (
    <CommonWrapper
      className="p-8 space-y-8"
      data-invalid={!!field.state.meta.errors.length}
    >
      <SectionTitle size={"sm"}>About Company</SectionTitle>
      <RichTextEditor
        value={field.state.value}
        onChange={field.handleChange}
        placeholder="Start typing..."
      />
      <FieldError errors={field.state.meta.errors} />
    </CommonWrapper>
  );
}
