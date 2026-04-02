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
import { Controller, type UseFormReturn } from "react-hook-form";
import type { RecruiterProfileFormData } from "../../recruiterProfileSchema";

interface ContactInformationSectionProps {
  form: UseFormReturn<RecruiterProfileFormData>;
}

export default function ContactInformationSection({
  form,
}: ContactInformationSectionProps) {
  return (
    <CommonWrapper className="p-8 space-y-8">
      <SectionTitle size={"sm"}>Contact Information</SectionTitle>
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field className="md:col-span-2">
          <FieldLabel>Address</FieldLabel>
          <Input
            {...form.register("address")}
            placeholder="71 St. Takayamio, Tokyo"
          />
          <FieldError>{form.formState.errors.address?.message}</FieldError>
        </Field>
        <Field className="col-span-2">
          <FieldLabel>Location</FieldLabel>
          <Controller
            name="location"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="VietNam">VietNam</SelectItem>
                  <SelectItem value="USA">USA</SelectItem>
                  <SelectItem value="Japan">Japan</SelectItem>
                  <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{form.formState.errors.location?.message}</FieldError>
        </Field>
      </FieldGroup>
    </CommonWrapper>
  );
}
