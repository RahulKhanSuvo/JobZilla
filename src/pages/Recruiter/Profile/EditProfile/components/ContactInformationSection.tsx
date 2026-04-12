import CommonWrapper from "@/components/common/CommonWrapper";
import SectionTitle from "@/components/common/SectionTitle";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type FormApi, useField } from "@tanstack/react-form";
import { type ZodValidator } from "@tanstack/zod-form-adapter";
import type { RecruiterProfileFormData } from "../../recruiterProfileSchema";

interface ContactInformationSectionProps {
  form: FormApi<RecruiterProfileFormData, ZodValidator>;
}

export default function ContactInformationSection({
  form,
}: ContactInformationSectionProps) {
  const addressField = useField({ form, name: "address" });
  const locationField = useField({ form, name: "location" });

  return (
    <CommonWrapper className="p-8 space-y-8">
      <SectionTitle size={"sm"}>Contact Information</SectionTitle>
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field
          className="md:col-span-2"
          data-invalid={!!addressField.state.meta.errors.length}
        >
          <FieldLabel>Address</FieldLabel>
          <Input
            value={addressField.state.value}
            onBlur={addressField.handleBlur}
            onChange={(e) => addressField.handleChange(e.target.value)}
            placeholder="71 St. Takayamio, Tokyo"
            aria-invalid={!!addressField.state.meta.errors.length}
          />
          <FieldError errors={addressField.state.meta.errors} />
        </Field>

        <Field
          className="col-span-2"
          data-invalid={!!locationField.state.meta.errors.length}
        >
          <FieldLabel>Location</FieldLabel>
          <Select
            key={(locationField.state.value as string) || "empty"}
            onValueChange={(val) =>
              locationField.handleChange(
                val as typeof locationField.state.value,
              )
            }
            value={locationField.state.value || undefined}
          >
            <SelectTrigger
              aria-invalid={!!locationField.state.meta.errors.length}
            >
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="VietNam">VietNam</SelectItem>
              <SelectItem value="USA">USA</SelectItem>
              <SelectItem value="Japan">Japan</SelectItem>
              <SelectItem value="Bangladesh">Bangladesh</SelectItem>
            </SelectContent>
          </Select>
          <FieldError errors={locationField.state.meta.errors} />
        </Field>
      </FieldGroup>
    </CommonWrapper>
  );
}
