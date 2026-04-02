/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

interface BasicInfoProps {
  userData: any;
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function calcAge(dob: string | null | undefined): string {
  if (!dob) return "—";
  const birth = new Date(dob);
  const now = new Date();
  const age = now.getFullYear() - birth.getFullYear();
  return `${age} years`;
}

export default function BasicInfo({ userData }: BasicInfoProps) {
  const candidate = userData?.data?.candidate || {};
  const email = userData?.data?.email || "—";

  const latestJob =
    candidate.workExperiences?.[candidate.workExperiences.length - 1];
  const latestEdu = candidate.eductions?.[candidate.eductions.length - 1];

  const rows = [
    { label: "Career Finding", value: latestJob?.jobTitle || "—" },
    { label: "Location", value: candidate.location || "—" },
    { label: "Phone", value: candidate.phone || "—" },
    { label: "Email", value: email },
    {
      label: "Gender",
      value: candidate.gender ? capitalize(candidate.gender) : "—",
    },
    { label: "Date of Birth", value: formatDate(candidate.dob) },
    { label: "Age", value: calcAge(candidate.dob) },
    {
      label: "Language",
      value: candidate.language ? capitalize(candidate.language) : "—",
    },
    { label: "Marital Status", value: candidate.maritalStatus || "—" },
    { label: "Qualification", value: latestEdu?.major || "—" },
    {
      label: "Experience",
      value:
        candidate.workExperiences?.length > 0
          ? `${candidate.workExperiences.length} position${candidate.workExperiences.length > 1 ? "s" : ""}`
          : "—",
    },
  ];

  return (
    <div className="p-6 bg-white dark:bg-slate-900 dark:text-gray-300 w-1/3 space-y-4 h-fit">
      {rows.map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center justify-between border-b border-[#E5E5E5] dark:border-slate-800 pb-3.5 gap-2"
        >
          <div className="text-sm text-gray-500 dark:text-gray-400 shrink-0">
            {label}
          </div>
          <h3 className="font-semibold dark:text-white text-sm text-right break-all">
            {value}
          </h3>
        </div>
      ))}

      {/* Social links */}
      <div className="flex flex-col border-b border-[#E5E5E5] dark:border-slate-800 pb-3.5 gap-2">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Social Links:
        </div>
        <div className="flex gap-3">
          {candidate.facebook && (
            <a
              href={candidate.facebook}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="hover:text-primary cursor-pointer transition-colors text-lg" />
            </a>
          )}
          {candidate.linkedin && (
            <a
              href={candidate.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="hover:text-primary cursor-pointer transition-colors text-lg" />
            </a>
          )}
          {candidate.twitter && (
            <a
              href={candidate.twitter}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="hover:text-primary cursor-pointer transition-colors text-lg" />
            </a>
          )}
          {!candidate.facebook && !candidate.linkedin && !candidate.twitter && (
            <span className="text-sm font-semibold dark:text-white">—</span>
          )}
        </div>
      </div>
    </div>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
