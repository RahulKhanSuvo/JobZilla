import { Progress } from "@/components/ui/progress";
import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import type { ProfileFormData } from "../../profileSchema";
import { calculateProfileCompletion } from "@/utils/profileCompletion";
import type { AuthUser } from "@/redux/features/auth/auth.type";

export default function ProfileProgress() {
  const values = useWatch<ProfileFormData>();

  const completion = useMemo(() => {
    const mappedData = {
      name: values.fullName,
      email: values.email,
      candidate: {
        phone: values.phone,
        location: values.location,
        aboutMe: values.aboutMe,
        gender: values.gender,
        preferredJobType: values.preferredJobType,
        preferredCareerLevel: values.preferredCareerLevel,
        preferredCategory: values.preferredCategory,
      },
      workExperiences: values.experienceList,
      eductions: values.educationList,
      skills: values.skills,
    } as unknown as AuthUser;

    const { percentage } = calculateProfileCompletion(mappedData);
    return percentage;
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
      <div className="container mx-auto px-4 ">
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
