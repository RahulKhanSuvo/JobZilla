import type { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import type { AuthUser } from "@/redux/features/auth/auth.type";

interface AboutSectionProps {
  data: AuthUser;
}

const AboutSection: FC<AboutSectionProps> = ({ data }) => {
  const basicInfoItems = [
    {
      label: "Date of Birth",
      value: data.candidate?.dob
        ? format(new Date(data.candidate?.dob), "dd MMM, yyyy")
        : "N/A",
    },
    { label: "Gender", value: data.candidate?.gender || "N/A" },
    { label: "Marital Status", value: data.candidate?.maritalStatus || "N/A" },
    {
      label: "Language",
      value:
        data?.languages
          ?.map((lang: { language: string }) => lang.language)
          .join(", ") || "N/A",
    },
  ];
  return (
    <Card className="border-none shadow bg-white dark:bg-slate-900 overflow-hidden">
      <CardHeader className="pb-4 pt-6">
        <CardTitle className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <span className="size-2 bg-primary rounded-full" />
          Professional Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-10 pb-10">
        <div className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg italic">
          {data.candidate?.aboutMe ? (
            <div
              className="prose prose-slate dark:prose-invert max-w-none first-letter:text-4xl first-letter:font-black first-letter:text-primary first-letter:mr-1"
              dangerouslySetInnerHTML={{ __html: data.candidate?.aboutMe }}
            />
          ) : (
            <p className="italic text-slate-400">
              "Experienced professional with a proven track record. Seeking new
              opportunities to leverage skills and contribute to organizational
              goals." (Sample summary)
            </p>
          )}
        </div>

        <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">
            Personal Dossier
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {basicInfoItems.map((item, idx) => (
              <div key={idx} className="space-y-1 group">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter group-hover:text-primary transition-colors">
                  {item.label}
                </p>
                <p className="font-bold text-slate-700 dark:text-slate-200">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AboutSection;
