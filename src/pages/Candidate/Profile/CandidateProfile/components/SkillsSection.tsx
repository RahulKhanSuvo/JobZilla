import type { FC } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Skill {
  id: string;
  skill: string;
}

interface SkillsSectionProps {
  skills: Skill[];
}

const SkillsSection: FC<SkillsSectionProps> = ({ skills = [] }) => {
  return (
    <Card className="border-none shadow col-span-2 bg-white dark:bg-slate-900 overflow-hidden">
      <CardHeader className="pb-4 pt-6">
        <CardTitle className="text-xl font-black text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-2">
          <span className="size-2 bg-primary rounded-full" />
          Technical Skills
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-8">
        {skills.length === 0 ? (
          <p className="text-slate-400 italic text-center py-6">
            "Identify your core technical strengths to help recruiters find
            you."
          </p>
        ) : (
          <div className="flex flex-wrap gap-3">
            {skills.map((s) => (
              <Badge
                key={s.id}
                variant="secondary"
                className="px-5 py-2 text-[10px] font-black uppercase tracking-widest bg-slate-50 dark:bg-slate-800/50 text-slate-600 dark:text-slate-300 border-none hover:bg-primary/10 hover:text-primary transition-all duration-300 cursor-default shadow-sm hover:shadow-md"
              >
                {s.skill}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsSection;
