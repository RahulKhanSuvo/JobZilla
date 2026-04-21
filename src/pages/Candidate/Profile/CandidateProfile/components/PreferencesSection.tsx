import type { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Briefcase, BarChart, LayoutGrid } from "lucide-react";
import type { AuthUser } from "@/redux/features/auth/auth.type";

interface PreferencesSectionProps {
  data: AuthUser;
}

const PreferencesSection: FC<PreferencesSectionProps> = ({ data }) => {
  const candidate = data.candidate;

  const preferences = [
    {
      label: "Job Type",
      value: candidate?.preferredJobType?.replace("_", " ") || "Not Specified",
      icon: Briefcase,
    },
    {
      label: "Career Level",
      value:
        candidate?.preferredCareerLevel?.replace("_", " ") || "Not Specified",
      icon: BarChart,
    },
    {
      label: "Category",
      value: candidate?.preferredCategory || "Not Specified",
      icon: LayoutGrid,
    },
  ];

  return (
    <Card className="border-none shadow bg-white dark:bg-slate-900 overflow-hidden">
      <CardHeader className="pb-4 pt-6">
        <CardTitle className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
          Career Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pb-8">
        <div className="grid grid-cols-1 gap-4">
          {preferences.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group hover:border-primary/20 transition-colors"
            >
              <div className="size-10 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <item.icon className="size-5" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                  {item.label}
                </p>
                <p className="font-bold text-slate-700 dark:text-slate-200 capitalize">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreferencesSection;
