import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle } from "lucide-react";

const steps = [
  { title: "Basic Information", completed: true },
  { title: "Educational background", completed: true },
  { title: "Work Experience", completed: true },
  { title: "Upload Portfolio", completed: false },
  { title: "Skill Assessment", completed: false },
];

export default function ProfileCompleteness() {
  const completedCount = steps.filter((s) => s.completed).length;
  const percentage = Math.round((completedCount / steps.length) * 100);

  return (
    <Card className="border-none shadow-sm dark:bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800">
        <div
          className="h-full bg-primary transition-all duration-1000 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">Profile Strength</CardTitle>
          <span className="text-primary font-bold">{percentage}%</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          Complete your profile to increase your chances of getting noticed by
          recruiters.
        </p>

        <ul className="space-y-3">
          {steps.map((step, index) => (
            <li key={index} className="flex items-center gap-3 text-sm">
              {step.completed ? (
                <CheckCircle2 className="size-4 text-green-500 shrink-0" />
              ) : (
                <Circle className="size-4 text-slate-300 dark:text-slate-700 shrink-0" />
              )}
              <span
                className={
                  step.completed ? "text-foreground" : "text-muted-foreground"
                }
              >
                {step.title}
              </span>
            </li>
          ))}
        </ul>

        <Button className="w-full mt-2 group">
          Improve Profile
          <span className="ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </Button>
      </CardContent>
    </Card>
  );
}
