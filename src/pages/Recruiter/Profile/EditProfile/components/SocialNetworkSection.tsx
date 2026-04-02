import CommonWrapper from "@/components/common/CommonWrapper";
import SectionTitle from "@/components/common/SectionTitle";
import { Input } from "@/components/ui/input";
import type { UseFormReturn } from "react-hook-form";
import type { RecruiterProfileFormData } from "../../recruiterProfileSchema";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

interface SocialNetworkSectionProps {
  form: UseFormReturn<RecruiterProfileFormData>;
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
          { name: "pinterest", icon: FaPinterestP, label: "Pinterest" },
          { name: "instagram", icon: FaInstagram, label: "Instagram" },
          { name: "youtube", icon: FaYoutube, label: "Youtube" },
        ].map((social) => (
          <div key={social.name} className="flex items-center gap-3">
            <div className="size-11 flex items-center justify-center bg-slate-50 rounded-lg shrink-0 border border-border">
              <social.icon className="size-5 text-slate-600" />
            </div>
            <Input
              type="url"
              {...form.register(social.name as keyof RecruiterProfileFormData)}
              placeholder="URL"
              className="h-11"
            />
          </div>
        ))}
      </div>
    </CommonWrapper>
  );
}
