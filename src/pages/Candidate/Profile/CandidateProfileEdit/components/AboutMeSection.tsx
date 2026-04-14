import type { FC } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import RichTextEditor from "@/components/common/RichTextEditor";

interface AboutMeSectionProps {
  value: string;
  onChange: (val: string) => void;
}

const AboutMeSection: FC<AboutMeSectionProps> = ({ value, onChange }) => {
  return (
    <div className="space-y-4 pt-4 border-t">
      <SectionTitle size="sm">About Me</SectionTitle>
      <RichTextEditor
        value={value}
        onChange={onChange}
        placeholder="Write about yourself..."
      />
    </div>
  );
};

export default AboutMeSection;
