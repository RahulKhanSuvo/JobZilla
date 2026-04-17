import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import type { ProfileFormData } from "../../profileSchema";

export default function ProfileProgress() {
  const { watch } = useFormContext<ProfileFormData>();
  const values = watch();

  const completion = useMemo(() => {
    const fields: (keyof ProfileFormData)[] = [
      "fullName",
      "email",
      "phone",
      "location",
      "aboutMe",
      "gender",
      "dob",
      "skills",
      "educationList",
      "experienceList",
      "facebook",
      "linkedin",
      "avatar",
    ];

    let filledCount = 0;
    fields.forEach((field) => {
      const val = values[field];
      if (Array.isArray(val)) {
        if (val.length > 0) filledCount++;
      } else if (val && val !== "") {
        filledCount++;
      }
    });

    return Math.round((filledCount / fields.length) * 100);
  }, [values]);

  const getStatusMessage = (percent: number) => {
    if (percent === 100) return "Profile Perfect!";
    if (percent > 80) return "Almost there!";
    if (percent > 50) return "Looking good!";
    if (percent > 20) return "Off to a grand start!";
    return "Let's complete your profile!";
  };

  return (
    <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b py-4 mb-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h3 className="text-lg font-bold text-primary">
              Profile Completion
            </h3>
            <p className="text-sm text-neutral-500">
              {getStatusMessage(completion)}
            </p>
          </div>
          <span className="text-2xl font-black text-primary">
            {completion}%
          </span>
        </div>
        <Progress value={completion} className="h-3 shadow-inner" />
      </div>
    </div>
  );
}
