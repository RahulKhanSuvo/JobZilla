import type { Application } from "@/types/application";
import CommonWrapper from "@/components/common/CommonWrapper";
import ApplicantAbout from "./ApplicantAbout";
import ApplicantSkills from "./ApplicantSkills";
import ApplicantEducation from "./ApplicantEducation";
import ApplicantExperience from "./ApplicantExperience";

interface Props {
  application: Application;
}

export default function ApplicantContent({ application }: Props) {
  const { user } = application;
  const candidate = user.candidate;

  const isEmpty =
    !candidate.aboutMe &&
    !candidate.skills?.length &&
    !candidate.eductions?.length &&
    !candidate.workExperiences?.length;

  return (
    <CommonWrapper className="p-8 space-y-8">
      {isEmpty ? (
        <p className="text-slate-400 text-sm text-center py-8">
          No resume information provided yet.
        </p>
      ) : (
        <>
          <ApplicantAbout aboutMe={candidate.aboutMe} />
          <ApplicantEducation educations={candidate.eductions} />
          <ApplicantExperience experiences={candidate.workExperiences} />
          <ApplicantSkills skills={candidate.skills} />
        </>
      )}
    </CommonWrapper>
  );
}
