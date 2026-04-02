/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import defaultAvatar from "@assets/logo/profile-icon-png-898.png";
import { Link } from "react-router";

interface InfoHeaderProps {
  userData: any;
}

export default function InfoHeader({ userData }: InfoHeaderProps) {
  const candidate = userData?.data?.candidate || {};
  const name = userData?.data?.name || "—";
  const rawSkills = candidate.skills || [];
  const skills: string[] = rawSkills
    .map((s: any) => (typeof s === "string" ? s : s.skill))
    .filter(Boolean);
  const avatarSrc = candidate.profileImage || defaultAvatar;

  // Use latest work experience job title as the career tagline
  const latestJob =
    candidate.workExperiences?.[candidate.workExperiences.length - 1];
  console.log("jobe", latestJob);
  const careerTitle = latestJob?.jobTitle || "—";

  return (
    <div className="flex bg-white dark:bg-slate-900 p-6 rounded items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          className="size-32 rounded-2xl border object-cover"
          src={avatarSrc}
          alt={name}
        />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h5 className="text-primary font-medium text-sm">{careerTitle}</h5>
            <h3 className="text-xl font-semibold">{name}</h3>
          </div>
          {skills.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              {skills.slice(0, 5).map((skill: string, i: number) => (
                <span
                  key={i}
                  className="text-sm bg-[#F1F1F1] dark:bg-slate-800 dark:text-gray-200 px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      <Link to={"edit"}>
        <Button
          className="rounded w-[185px] h-[48px] border-primary"
          variant="outline"
        >
          Edit Profile
        </Button>
      </Link>
    </div>
  );
}
