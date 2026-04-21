import type { FC } from "react";
import { format } from "date-fns";
import { User2, Calendar, Heart, Globe } from "lucide-react";
import type { AuthUser } from "@/redux/features/auth/auth.type";

interface AboutSectionProps {
  data: AuthUser;
}

const AboutSection: FC<AboutSectionProps> = ({ data }) => {
  const languages =
    data?.languages?.map((l: { language: string }) => l.language).join(", ") ||
    null;

  const basicInfo = [
    {
      icon: Calendar,
      label: "Date of Birth",
      value: data.candidate?.dob
        ? format(new Date(data.candidate.dob), "dd MMM yyyy")
        : null,
    },
    {
      icon: User2,
      label: "Gender",
      value: data.candidate?.gender || null,
    },
    {
      icon: Heart,
      label: "Marital Status",
      value: data.candidate?.maritalStatus || null,
    },
    {
      icon: Globe,
      label: "Languages",
      value: languages,
    },
  ].filter((item) => item.value);

  return (
    <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-border/30 overflow-hidden">
      <div className="px-6 md:px-8 py-6">
        <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-1 h-5 bg-primary rounded-full inline-block" />
          About Me
        </h2>

        {data.candidate?.aboutMe ? (
          <div
            className="prose prose-slate dark:prose-invert max-w-none text-muted-foreground leading-relaxed text-sm"
            dangerouslySetInnerHTML={{ __html: data.candidate.aboutMe }}
          />
        ) : (
          <p className="text-muted-foreground italic text-sm">
            No about information provided yet.
          </p>
        )}

        {basicInfo.length > 0 && (
          <div className="mt-6 pt-5 border-t border-border/50 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {basicInfo.map((item) => (
              <div
                key={item.label}
                className="flex flex-col gap-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60"
              >
                <div className="flex items-center gap-1.5 text-primary">
                  <item.icon className="size-3.5" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutSection;
