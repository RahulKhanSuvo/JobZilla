import CommonWrapper from "@/components/common/CommonWrapper";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import type { IconType } from "react-icons";
import type { RecruiterProfileFormData } from "../../recruiterProfileSchema";

interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex items-center justify-between py-5 border-b border-border last:border-0">
    <span className="text-foreground font-medium">{label}</span>
    <span className="text-muted-foreground text-right">{value}</span>
  </div>
);

const SocialIcon = ({ icon: Icon, href }: { icon: IconType; href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="size-10 flex items-center justify-center bg-[#F5F5F5] dark:bg-[#222222] rounded-full text-foreground hover:bg-primary hover:text-white transition-all"
  >
    <Icon className="size-4" />
  </a>
);

export default function CompanyInfo({
  company,
}: {
  company: RecruiterProfileFormData | null | undefined;
}) {
  const companyData = [
    { label: "Email", value: company?.email },
    { label: "Industry", value: company?.industry },
    { label: "Company size", value: company?.companySize },
    { label: "Headquarters", value: "448544" },
    { label: "Founded", value: "2017" },
  ];

  const socials = [
    { icon: FaFacebookF, href: company?.facebook || "#" },
    { icon: FaLinkedinIn, href: company?.linkedin || "#" },
    { icon: FaTwitter, href: company?.twitter || "#" },
  ];

  return (
    <CommonWrapper className="p-0 overflow-hidden">
      <div className="px-6 py-2">
        {companyData.map((item, index) => (
          <InfoRow key={index} label={item.label} value={item.value || "N/A"} />
        ))}
      </div>

      <div className="px-6 py-6 space-y-4">
        <h4 className="font-bold text-foreground">Socials:</h4>
        <div className="flex items-center gap-3">
          {socials.map((social, index) => (
            <SocialIcon key={index} icon={social.icon} href={social.href} />
          ))}
        </div>
      </div>
    </CommonWrapper>
  );
}
