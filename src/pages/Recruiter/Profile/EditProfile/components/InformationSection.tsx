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

interface InformationSectionProps {
  form: UseFormReturn<RecruiterProfileFormData>;
}

export default function InformationSection({ form }: InformationSectionProps) {
  return (
    <CommonWrapper className="p-8 space-y-8">
      <SectionTitle size={"sm"}>Information</SectionTitle>
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field>
          <FieldLabel>Employer Name</FieldLabel>
          <Input {...form.register("name")} placeholder="Avitex Agency" />
          <FieldError>{form.formState.errors.name?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Email</FieldLabel>
          <Input
            aria-invalid={!!form.formState.errors.email}
            {...form.register("email")}
            placeholder="hi.avitex@gmail.com"
          />
          <FieldError>{form.formState.errors.email?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Phone Number</FieldLabel>
          <Input
            aria-invalid={!!form.formState.errors.phone}
            {...form.register("phone")}
            placeholder="123 456 7890"
          />
          <FieldError>{form.formState.errors.phone?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Website</FieldLabel>
          <Input
            aria-invalid={!!form.formState.errors.website}
            {...form.register("website")}
            placeholder="https://avitex.com"
          />
          <FieldError>{form.formState.errors.website?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Founded Date</FieldLabel>
          <Controller
            name="foundedDate"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Year" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(30)].map((_, i) => (
                    <SelectItem key={i} value={(2026 - i).toString()}>
                      {2026 - i}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{form.formState.errors.foundedDate?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel>Company Size</FieldLabel>
          <Controller
            name="companySize"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10-50">10 - 50</SelectItem>
                  <SelectItem value="50-200">50 - 200</SelectItem>
                  <SelectItem value="200-500">200 - 500</SelectItem>
                  <SelectItem value="500+">500+</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{form.formState.errors.companySize?.message}</FieldError>
        </Field>

        <div className="space-y-3">
          <FieldLabel>Show profile</FieldLabel>

          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="radio"
                value="true"
                {...form.register("showProfile", {
                  setValueAs: (value) => value === "true",
                })}
                className="size-4 accent-primary"
              />
              <span className="text-sm font-medium">Show</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="radio"
                value="false"
                {...form.register("showProfile", {
                  setValueAs: (value) => value === "true",
                })}
                className="size-4 accent-primary"
              />
              <span className="text-sm font-medium">Hidden</span>
            </label>
          </div>

          <FieldError>{form.formState.errors.showProfile?.message}</FieldError>
        </div>

        <Field className="md:col-span-2">
          <FieldLabel>
            Industry <span className="text-red-500">*</span>
          </FieldLabel>
          <Controller
            name="industry"
            control={form.control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger aria-invalid={!!form.formState.errors.industry}>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="IT">IT</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Healthcare">Healthcare</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError>{form.formState.errors.industry?.message}</FieldError>
        </Field>
      </FieldGroup>
    </CommonWrapper>
  );
}
