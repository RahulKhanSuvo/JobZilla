import type { FC } from "react";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import SectionTitle from "@/components/common/SectionTitle";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FieldState = {
  errors: (string | Error | { message: string })[];
  isTouched: boolean;
  isValid: boolean;
};

type Errors = Partial<Record<string, FieldState>>;

interface SocialLinksSectionProps {
  facebook: string;
  linkedin: string;
  twitter: string;
  errors?: Errors;
  onChange: (field: string, value: string) => void;
}

const socialLinks = [
  {
    key: "facebook" as const,
    icon: FaFacebookF,
    placeholder: "http://www.facebook.com/yourprofile",
  },
  {
    key: "linkedin" as const,
    icon: FaLinkedinIn,
    placeholder: "https://linkedin.com/in/yourprofile",
  },
  {
    key: "twitter" as const,
    icon: FaTwitter,
    placeholder: "https://twitter.com/yourhandle",
  },
];

const SocialLinksSection: FC<SocialLinksSectionProps> = ({
  facebook,
  linkedin,
  twitter,
  errors = {},
  onChange,
}) => {
  const values = { facebook, linkedin, twitter };

  return (
    <div className="space-y-6 pt-6 border-t">
      <SectionTitle size="sm">Social Network</SectionTitle>
      <div className="grid grid-cols-2 gap-6">
        {socialLinks.map((item) => {
          const value = values[item.key];
          const fieldState = errors[item.key];
          const isInvalid = fieldState?.isTouched && !fieldState?.isValid;
          return (
            <div key={item.key} className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center size-10 rounded-full bg-[#F5F5F5] dark:bg-[#222222] shrink-0">
                  <item.icon className="text-[14px]" />
                </div>
                <Input
                  placeholder={item.placeholder}
                  className="h-11 border-none shadow-none"
                  variant="withBg"
                  value={value ?? ""}
                  onChange={(e) => onChange(item.key, e.target.value)}
                  aria-invalid={isInvalid}
                />
              </div>
              {isInvalid && (
                <FieldError className="ml-14" errors={fieldState?.errors} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinksSection;
