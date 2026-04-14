import type { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import type { CandidateProfileData } from "@/redux/features/auth/auth.type";

interface AboutSectionProps {
  data: CandidateProfileData;
}

const AboutSection: FC<AboutSectionProps> = ({ data }) => {
  const basicInfoItems = [
    {
      label: "Date of Birth",
      value: data.dob ? format(new Date(data.dob), "dd MMM, yyyy") : "N/A",
    },
    { label: "Gender", value: data.gender || "N/A" },
    { label: "Marital Status", value: data.maritalStatus || "N/A" },
    { label: "Language", value: data.language || "N/A" },
  ];

  return (
    <Card className="border-none shadow-sm dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-xl font-bold border-b border-border/50 pb-4">
          About Me
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-muted-foreground leading-relaxed">
          {data.aboutMe ? (
            <div
              className="prose prose-slate dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: data.aboutMe }}
            />
          ) : (
            <p className="italic">No about information provided yet.</p>
          )}
        </div>

        <div className="pt-4 border-t border-border/50">
          <h3 className="font-semibold mb-4 text-foreground">
            Basic Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {basicInfoItems.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-medium text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
