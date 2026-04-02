/* eslint-disable @typescript-eslint/no-explicit-any */
import WorkExperience from "./WorkExperience";
import Education from "./Education";

interface AboutUseMeProps {
  userData: any;
}

export default function AboutUseMe({ userData }: AboutUseMeProps) {
  const candidate = userData?.data?.candidate || {};
  const aboutMe: string = candidate.aboutMe || "";

  // Strip HTML tags from rich text for display
  const plainAbout = aboutMe.replace(/<[^>]+>/g, "").trim();

  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded w-2/3">
      <h3 className="font-semibold text-xl mb-4 dark:text-white">About Me</h3>
      {plainAbout ? (
        <div
          className="text-[#64666c] dark:text-gray-300 mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: aboutMe }}
        />
      ) : (
        <p className="text-[#64666c] dark:text-gray-400 mb-4 italic">
          No bio added yet.
        </p>
      )}

      <Education eductions={candidate.eductions || []} />
      <WorkExperience workExperiences={candidate.workExperiences || []} />
    </div>
  );
}
