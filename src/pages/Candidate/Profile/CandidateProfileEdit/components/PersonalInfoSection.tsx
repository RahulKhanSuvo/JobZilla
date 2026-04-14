/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import type { ProfileFormData } from "../../profileSchema";
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

type Errors = Partial<Record<string, string[]>>;

interface PersonalInfoSectionProps {
  values: Pick<
    ProfileFormData,
    | "fullName"
    | "email"
    | "phone"
    | "location"
    | "dob"
    | "gender"
    | "maritalStatus"
    | "language"
    | "skills"
  >;
  errors?: Errors;
  onChange: (field: keyof ProfileFormData, value: any) => void;
}

const PersonalInfoSection: FC<PersonalInfoSectionProps> = ({
  values,
  errors = {},
  onChange,
}) => {
  return (
    <div className="space-y-6">
      <SectionTitle size="sm">Information</SectionTitle>
      <FieldGroup className="grid grid-cols-2 gap-6">
        {/* Full Name */}
        <Field data-invalid={!!errors.fullName?.length}>
          <FieldLabel className="font-bold">Full Name</FieldLabel>
          <Input
            placeholder="Enter your full name"
            className="h-11"
            variant="withBg"
            type="text"
            value={values.fullName ?? ""}
            onChange={(e) => onChange("fullName", e.target.value)}
            aria-invalid={!!errors.fullName?.length}
          />
          <FieldError errors={errors.fullName ?? []} />
        </Field>

        {/* Email */}
        <Field data-invalid={!!errors.email?.length}>
          <FieldLabel className="font-bold">Email</FieldLabel>
          <Input
            placeholder="Enter your email address"
            className="h-11"
            variant="withBg"
            type="email"
            disabled
            value={values.email ?? ""}
            onChange={(e) => onChange("email", e.target.value)}
            aria-invalid={!!errors.email?.length}
          />
          <FieldError errors={errors.email ?? []} />
        </Field>

        {/* Phone */}
        <Field data-invalid={!!errors.phone?.length}>
          <FieldLabel className="font-bold">Phone</FieldLabel>
          <Input
            placeholder="Enter your phone number"
            className="h-11"
            variant="withBg"
            type="tel"
            value={values.phone ?? ""}
            onChange={(e) => onChange("phone", e.target.value)}
            aria-invalid={!!errors.phone?.length}
          />
          <FieldError errors={errors.phone ?? []} />
        </Field>

        {/* Location */}
        <Field data-invalid={!!errors.location?.length}>
          <FieldLabel className="font-bold">Location</FieldLabel>
          <Input
            placeholder="Enter your location"
            className="h-11"
            variant="withBg"
            type="text"
            value={values.location ?? ""}
            onChange={(e) => onChange("location", e.target.value)}
            aria-invalid={!!errors.location?.length}
          />
          <FieldError errors={errors.location ?? []} />
        </Field>

        {/* Date of Birth */}
        <Field>
          <FieldLabel className="font-bold">Date of Birth</FieldLabel>
          <Input
            className="h-11"
            variant="withBg"
            type="date"
            value={values.dob ?? ""}
            onChange={(e) => onChange("dob", e.target.value)}
          />
        </Field>

        {/* Gender */}
        <Field data-invalid={!!errors.gender?.length}>
          <FieldLabel className="font-bold">Gender</FieldLabel>
          <div className="space-y-2 text-left">
            <Select
              key={(values.gender as string) || "empty"}
              onValueChange={(val) => onChange("gender", val)}
              value={(values.gender as string) ?? undefined}
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
            <FieldError errors={errors.gender ?? []} />
          </div>
        </Field>

        {/* Marital Status */}
        <Field data-invalid={!!errors.maritalStatus?.length}>
          <FieldLabel className="font-bold">Marital Status</FieldLabel>
          <div className="space-y-2 text-left">
            <Select
              key={(values.maritalStatus as string) || "empty"}
              onValueChange={(val) => onChange("maritalStatus", val)}
              value={(values.maritalStatus as string) ?? undefined}
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
            <FieldError errors={errors.maritalStatus ?? []} />
          </div>
        </Field>

        {/* Language */}
        <Field data-invalid={!!errors.language?.length}>
          <FieldLabel className="font-bold">Language</FieldLabel>
          <div className="space-y-2 text-left">
            <Select
              key={(values.language as string) || "empty"}
              onValueChange={(val) => onChange("language", val)}
              value={(values.language as string) ?? undefined}
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
            <FieldError errors={errors.language ?? []} />
          </div>
        </Field>

        {/* Skills */}
        <Field className="col-span-2">
          <FieldLabel className="font-bold">Skills</FieldLabel>
          <SkillTagsInput
            value={values.skills ?? []}
            onChange={(val) => onChange("skills", val)}
            variant="withBg"
          />
        </Field>
      </FieldGroup>
    </div>
  );
};

export default PersonalInfoSection;
