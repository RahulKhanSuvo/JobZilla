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

interface InformationSectionProps {
  form: FormApi<RecruiterProfileFormData, ZodValidator>;
}

export default function InformationSection({ form }: InformationSectionProps) {
  const nameField = useField({ form, name: "name" });
  const emailField = useField({ form, name: "email" });
  const phoneField = useField({ form, name: "phone" });
  const websiteField = useField({ form, name: "website" });
  const foundedDateField = useField({ form, name: "foundedDate" });
  const companySizeField = useField({ form, name: "companySize" });
  const showProfileField = useField({ form, name: "showProfile" });
  const industryField = useField({ form, name: "industry" });

  return (
    <CommonWrapper className="p-8 space-y-8">
      <SectionTitle size={"sm"}>Information</SectionTitle>
      <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field data-invalid={!!nameField.state.meta.errors.length}>
          <FieldLabel>Employer Name</FieldLabel>
          <Input
            value={nameField.state.value}
            onBlur={nameField.handleBlur}
            onChange={(e) => nameField.handleChange(e.target.value)}
            placeholder="Avitex Agency"
            aria-invalid={!!nameField.state.meta.errors.length}
          />
          <FieldError errors={nameField.state.meta.errors} />
        </Field>

        <Field data-invalid={!!emailField.state.meta.errors.length}>
          <FieldLabel>Email</FieldLabel>
          <Input
            value={emailField.state.value}
            disabled
            onBlur={emailField.handleBlur}
            onChange={(e) => emailField.handleChange(e.target.value)}
            placeholder="hi.avitex@gmail.com"
            aria-invalid={!!emailField.state.meta.errors.length}
          />
          <FieldError errors={emailField.state.meta.errors} />
        </Field>

        <Field data-invalid={!!phoneField.state.meta.errors.length}>
          <FieldLabel>Phone Number</FieldLabel>
          <Input
            value={phoneField.state.value}
            onBlur={phoneField.handleBlur}
            onChange={(e) => phoneField.handleChange(e.target.value)}
            placeholder="123 456 7890"
            aria-invalid={!!phoneField.state.meta.errors.length}
          />
          <FieldError errors={phoneField.state.meta.errors} />
        </Field>

        <Field data-invalid={!!websiteField.state.meta.errors.length}>
          <FieldLabel>Website</FieldLabel>
          <Input
            value={websiteField.state.value}
            onBlur={websiteField.handleBlur}
            onChange={(e) => websiteField.handleChange(e.target.value)}
            placeholder="https://avitex.com"
            aria-invalid={!!websiteField.state.meta.errors.length}
          />
          <FieldError errors={websiteField.state.meta.errors} />
        </Field>

        <Field data-invalid={!!foundedDateField.state.meta.errors.length}>
          <FieldLabel>Founded Date</FieldLabel>
          <Select
            key={(foundedDateField.state.value as string) || "empty"}
            onValueChange={(val) =>
              foundedDateField.handleChange(
                val as typeof foundedDateField.state.value,
              )
            }
            value={foundedDateField.state.value || undefined}
          >
            <SelectTrigger
              aria-invalid={!!foundedDateField.state.meta.errors.length}
            >
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
          <FieldError errors={foundedDateField.state.meta.errors} />
        </Field>

        <Field data-invalid={!!companySizeField.state.meta.errors.length}>
          <FieldLabel>Company Size</FieldLabel>
          <Select
            key={(companySizeField.state.value as string) || "empty"}
            onValueChange={(val) =>
              companySizeField.handleChange(
                val as typeof companySizeField.state.value,
              )
            }
            value={companySizeField.state.value || undefined}
          >
            <SelectTrigger
              aria-invalid={!!companySizeField.state.meta.errors.length}
            >
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10-50">10 - 50</SelectItem>
              <SelectItem value="50-200">50 - 200</SelectItem>
              <SelectItem value="200-500">200 - 500</SelectItem>
              <SelectItem value="500+">500+</SelectItem>
            </SelectContent>
          </Select>
          <FieldError errors={companySizeField.state.meta.errors} />
        </Field>

        <div className="space-y-3">
          <FieldLabel>Show profile</FieldLabel>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="radio"
                checked={showProfileField.state.value === true}
                onChange={() => showProfileField.handleChange(true)}
                className="size-4 accent-primary"
              />
              <span className="text-sm font-medium">Show</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <Input
                type="radio"
                checked={showProfileField.state.value === false}
                onChange={() => showProfileField.handleChange(false)}
                className="size-4 accent-primary"
              />
              <span className="text-sm font-medium">Hidden</span>
            </label>
          </div>
          <FieldError errors={showProfileField.state.meta.errors} />
        </div>

        <Field
          className="md:col-span-2"
          data-invalid={!!industryField.state.meta.errors.length}
        >
          <FieldLabel>
            Industry <span className="text-red-500">*</span>
          </FieldLabel>
          <Select
            key={(industryField.state.value as string) || "empty"}
            onValueChange={(val) =>
              industryField.handleChange(
                val as typeof industryField.state.value,
              )
            }
            value={industryField.state.value || undefined}
          >
            <SelectTrigger
              aria-invalid={!!industryField.state.meta.errors.length}
            >
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
          <FieldError errors={industryField.state.meta.errors} />
        </Field>
      </FieldGroup>
    </CommonWrapper>
  );
}
