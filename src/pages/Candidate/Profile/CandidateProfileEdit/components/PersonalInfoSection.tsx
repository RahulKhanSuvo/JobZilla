/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import type { FieldApi } from "@tanstack/react-form";
import SectionTitle from "@/components/common/SectionTitle";
import SkillTagsInput from "@/components/common/SkillTagsInput";
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

type AnyField = FieldApi<any, any, any, any, any>;

interface PersonalInfoSectionProps {
  fullNameField: AnyField;
  emailField: AnyField;
  phoneField: AnyField;
  locationField: AnyField;
  dobField: AnyField;
  genderField: AnyField;
  maritalStatusField: AnyField;
  languageField: AnyField;
  skillsField: AnyField;
}

const PersonalInfoSection: FC<PersonalInfoSectionProps> = ({
  fullNameField,
  emailField,
  phoneField,
  locationField,
  dobField,
  genderField,
  maritalStatusField,
  languageField,
  skillsField,
}) => {
  return (
    <div className="space-y-6">
      <SectionTitle size="sm">Information</SectionTitle>
      <FieldGroup className="grid grid-cols-2 gap-6">
        {/* Full Name */}
        <Field data-invalid={!!fullNameField.state.meta.errors.length}>
          <FieldLabel className="font-bold">Full Name</FieldLabel>
          <Input
            placeholder="Enter your full name"
            className="h-11"
            variant="withBg"
            type="text"
            value={fullNameField.state.value}
            onBlur={fullNameField.handleBlur}
            onChange={(e) => fullNameField.handleChange(e.target.value)}
            aria-invalid={!!fullNameField.state.meta.errors.length}
          />
          <FieldError errors={fullNameField.state.meta.errors} />
        </Field>

        {/* Email */}
        <Field data-invalid={!!emailField.state.meta.errors.length}>
          <FieldLabel className="font-bold">Email</FieldLabel>
          <Input
            placeholder="Enter your email address"
            className="h-11"
            variant="withBg"
            type="email"
            disabled
            value={emailField.state.value}
            onBlur={emailField.handleBlur}
            onChange={(e) => emailField.handleChange(e.target.value)}
            aria-invalid={!!emailField.state.meta.errors.length}
          />
          <FieldError errors={emailField.state.meta.errors} />
        </Field>

        {/* Phone */}
        <Field data-invalid={!!phoneField.state.meta.errors.length}>
          <FieldLabel className="font-bold">Phone</FieldLabel>
          <Input
            placeholder="Enter your phone number"
            className="h-11"
            variant="withBg"
            type="tel"
            value={phoneField.state.value}
            onBlur={phoneField.handleBlur}
            onChange={(e) => phoneField.handleChange(e.target.value)}
            aria-invalid={!!phoneField.state.meta.errors.length}
          />
          <FieldError errors={phoneField.state.meta.errors} />
        </Field>

        {/* Location */}
        <Field data-invalid={!!locationField.state.meta.errors.length}>
          <FieldLabel className="font-bold">Location</FieldLabel>
          <Input
            placeholder="Enter your location"
            className="h-11"
            variant="withBg"
            type="text"
            value={locationField.state.value}
            onBlur={locationField.handleBlur}
            onChange={(e) => locationField.handleChange(e.target.value)}
            aria-invalid={!!locationField.state.meta.errors.length}
          />
          <FieldError errors={locationField.state.meta.errors} />
        </Field>

        {/* Date of Birth */}
        <Field>
          <FieldLabel className="font-bold">Date of Birth</FieldLabel>
          <Input
            className="h-11"
            variant="withBg"
            type="date"
            value={dobField.state.value}
            onBlur={dobField.handleBlur}
            onChange={(e) => dobField.handleChange(e.target.value)}
          />
        </Field>

        {/* Gender */}
        <Field data-invalid={!!genderField.state.meta.errors.length}>
          <FieldLabel className="font-bold">Gender</FieldLabel>
          <div className="space-y-2 text-left">
            <Select
              key={(genderField.state.value as string) || "empty"}
              onValueChange={(val) =>
                genderField.handleChange(val as typeof genderField.state.value)
              }
              value={genderField.state.value || undefined}
            >
              <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent className="rounded-none" position="popper">
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            <FieldError errors={genderField.state.meta.errors} />
          </div>
        </Field>

        {/* Marital Status */}
        <Field data-invalid={!!maritalStatusField.state.meta.errors.length}>
          <FieldLabel className="font-bold">Marital Status</FieldLabel>
          <div className="space-y-2 text-left">
            <Select
              key={(maritalStatusField.state.value as string) || "empty"}
              onValueChange={(val) =>
                maritalStatusField.handleChange(
                  val as typeof maritalStatusField.state.value,
                )
              }
              value={maritalStatusField.state.value || undefined}
            >
              <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                <SelectValue placeholder="Select marital status" />
              </SelectTrigger>
              <SelectContent className="rounded-none" position="popper">
                <SelectItem value="single">Single</SelectItem>
                <SelectItem value="married">Married</SelectItem>
                <SelectItem value="divorced">Divorced</SelectItem>
                <SelectItem value="widowed">Widowed</SelectItem>
              </SelectContent>
            </Select>
            <FieldError errors={maritalStatusField.state.meta.errors} />
          </div>
        </Field>

        {/* Language */}
        <Field data-invalid={!!languageField.state.meta.errors.length}>
          <FieldLabel className="font-bold">Language</FieldLabel>
          <div className="space-y-2 text-left">
            <Select
              key={(languageField.state.value as string) || "empty"}
              onValueChange={(val) =>
                languageField.handleChange(
                  val as typeof languageField.state.value,
                )
              }
              value={languageField.state.value || undefined}
            >
              <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                <SelectValue placeholder="Select your language" />
              </SelectTrigger>
              <SelectContent className="rounded-none" position="popper">
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="bengali">Bengali</SelectItem>
              </SelectContent>
            </Select>
            <FieldError errors={languageField.state.meta.errors} />
          </div>
        </Field>

        {/* Skills */}
        <Field className="col-span-2">
          <FieldLabel className="font-bold">Skills</FieldLabel>
          <SkillTagsInput
            value={skillsField.state.value ?? []}
            onChange={(val) => skillsField.handleChange(val)}
            variant="withBg"
          />
        </Field>
      </FieldGroup>
    </div>
  );
};

export default PersonalInfoSection;
