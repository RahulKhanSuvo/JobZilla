/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FC } from "react";
import type { FieldApi } from "@tanstack/react-form";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import SectionTitle from "@/components/common/SectionTitle";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type AnyField = FieldApi<any, any, any, any, any>;

interface SocialLinksSectionProps {
  facebookField: AnyField;
  linkedinField: AnyField;
  twitterField: AnyField;
}

const socialLinks = [
  {
    key: "facebook" as const,
    icon: FaFacebookF,
    label: "Facebook",
    placeholder: "http://www.facebook.com/yourprofile",
  },
  {
    key: "linkedin" as const,
    icon: FaLinkedinIn,
    label: "LinkedIn",
    placeholder: "https://linkedin.com/in/yourprofile",
  },
  {
    key: "twitter" as const,
    icon: FaTwitter,
    label: "Twitter",
    placeholder: "https://twitter.com/yourhandle",
  },
];

const SocialLinksSection: FC<SocialLinksSectionProps> = ({
  facebookField,
  linkedinField,
  twitterField,
}) => {
  const fieldMap = {
    facebook: facebookField,
    linkedin: linkedinField,
    twitter: twitterField,
  };

  return (
    <div className="space-y-6 pt-6 border-t">
      <SectionTitle size="sm">Social Network</SectionTitle>
      <div className="grid grid-cols-2 gap-6">
        {socialLinks.map((item) => {
          const field = fieldMap[item.key];
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
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={!!field.state.meta.errors.length}
                />
              </div>
              <FieldError className="ml-14" errors={field.state.meta.errors} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialLinksSection;
