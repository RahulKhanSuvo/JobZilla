import type { Application } from "@/types/application";
import CommonWrapper from "@/components/common/CommonWrapper";
import ApplicantAbout from "./ApplicantAbout";
import ApplicantSkills from "./ApplicantSkills";
import ApplicantEducation from "./ApplicantEducation";
import ApplicantExperience from "./ApplicantExperience";
import ApplicantLanguages from "./ApplicantLanguages";

interface Props {
  application: Application;
}

export default function ApplicantContent({ application }: Props) {
  const { user } = application;
  if (!user) return null;
  const candidate = user.candidate;

  const isEmpty =
    !candidate?.aboutMe &&
    !user.skills?.length &&
    !user.eductions?.length &&
    !user.workExperiences?.length &&
    !user.languages?.length;

  return (
    <CommonWrapper className="p-10 space-y-12">
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-12 gap-3">
          <div className="size-16 rounded-full bg-slate-50 flex items-center justify-center">
            <span className="text-2xl">📄</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">
            No resume information provided yet.
          </p>
        </div>
      ) : (
        <>
          <ApplicantAbout aboutMe={candidate?.aboutMe} />
          <ApplicantExperience experiences={user.workExperiences} />
          <ApplicantEducation educations={user.eductions} />
          <ApplicantSkills skills={user.skills} />
          <ApplicantLanguages languages={user.languages} />
        </>
      )}
    </CommonWrapper>
  );
}
