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
    <Card className="border-none shadow-sm dark:bg-slate-900">
      <CardHeader>
        <CardTitle className="text-xl font-bold border-b border-border/50 pb-4">
          Skills
        </CardTitle>
      </CardHeader>
      <CardContent>
        {skills.length === 0 ? (
          <p className="text-muted-foreground italic">No skills added yet.</p>
        ) : (
          <div className="flex flex-wrap gap-2.5">
            {skills.map((s) => (
              <Badge
                key={s.id}
                variant="secondary"
                className="px-4 py-1.5 text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
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
