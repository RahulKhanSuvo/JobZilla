import CommonWrapper from "@/components/common/CommonWrapper";
import SectionTitle from "@/components/common/SectionTitle";
import { Input } from "@/components/ui/input";
import { type FormApi, useField } from "@tanstack/react-form";
import { type ZodValidator } from "@tanstack/zod-form-adapter";
import type { RecruiterProfileFormData } from "../../recruiterProfileSchema";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import type { IconType } from "react-icons";

interface SocialFieldProps {
  form: FormApi<RecruiterProfileFormData, ZodValidator>;
  name: keyof RecruiterProfileFormData;
  icon: IconType;
}

const SocialField = ({ form, name, icon: Icon }: SocialFieldProps) => {
  const field = useField({ form, name });

  return (
    <div className="flex items-center gap-3">
      <div className="size-11 flex items-center justify-center bg-slate-50 rounded-lg shrink-0 border border-border">
        <Icon className="size-5 text-slate-600" />
      </div>
      <div className="flex-1 space-y-1">
        <Input
          type="url"
          value={field.state.value as string}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          placeholder="URL"
          className="h-11"
          aria-invalid={!!field.state.meta.errors.length}
        />
      </div>
    </div>
  );
};

interface SocialNetworkSectionProps {
  form: FormApi<RecruiterProfileFormData, ZodValidator>;
}

export default function SocialNetworkSection({
  form,
}: SocialNetworkSectionProps) {
  return (
    <CommonWrapper className="p-8 space-y-8">
      <SectionTitle size={"sm"}>Social Network</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "facebook", icon: FaFacebookF, label: "Facebook" },
          { name: "linkedin", icon: FaLinkedinIn, label: "Linkedin" },
          { name: "twitter", icon: FaTwitter, label: "Twitter" },
        ].map((social) => (
          <SocialField
            key={social.name}
            form={form}
            name={social.name as keyof RecruiterProfileFormData}
            icon={social.icon}
          />
        ))}
      </div>
    </CommonWrapper>
  );
}
