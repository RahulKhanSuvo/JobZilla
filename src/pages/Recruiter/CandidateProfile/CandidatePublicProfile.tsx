import { useParams, useNavigate } from "react-router";
import { useGetCandidateByIdQuery } from "@/redux/features/candidate/candidate.api";
import {
  User,
  MapPin,
  Mail,
  Phone,
  Briefcase,
  GraduationCap,
  Languages,
  ArrowLeft,
  Calendar,
  Linkedin,
  Github,
  Facebook,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import JobzillaLoading from "@/components/common/JobzillaLoading";
import { Badge } from "@/components/ui/badge";

export default function CandidatePublicProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetCandidateByIdQuery(id!, { skip: !id });

  const candidate = response?.data;
  const user = candidate?.user;

  if (isLoading) return <JobzillaLoading />;

  if (isError || !candidate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Candidate Not Found
          </h2>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-slate-50/50 min-h-screen">
      <Button
        variant="link"
        className="mb-6 hover:bg-slate-200"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Header & Main Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded shadow p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm shrink-0">
                <img
                  src={
                    candidate.avatar ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`
                  }
                  className="w-full h-full object-cover"
                  alt={user?.name}
                />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">
                    {user?.name}
                  </h1>
                  <p className="text-primary font-semibold text-lg">
                    {candidate.preferredCategory || "Candidate"}
                  </p>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {candidate.location || "Location not specified"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-4 h-4 text-slate-400" />
                    {candidate.experienceYears || 0} Years Experience
                  </div>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
                  {candidate.facebook && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      asChild
                    >
                      <a
                        href={candidate.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {candidate.linkedin && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      asChild
                    >
                      <a
                        href={candidate.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                  {candidate.github && (
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                      asChild
                    >
                      <a
                        href={candidate.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded shadow p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-4">
              Professional Summary
            </h2>
            <div
              className="text-slate-600 leading-relaxed italic"
              dangerouslySetInnerHTML={{
                __html: candidate.aboutMe || "No summary provided.",
              }}
            />
          </div>

          {/* Experience */}
          <div className="bg-white rounded shadow p-6 md:p-8 space-y-8">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" /> Work Experience
            </h2>
            <div className="space-y-8 relative before:absolute before:left-3 md:before:left-4 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-100">
              {user?.workExperiences?.length ? (
                user.workExperiences.map((exp) => (
                  <div key={exp.id} className="relative pl-10 md:pl-12">
                    <div className="absolute left-[-2px] md:left-px top-1.5 w-6 h-6 rounded-full bg-white border-4 border-primary z-10" />
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">
                        {exp.jobTitle}
                      </h3>
                      <p className="text-primary font-medium">
                        {exp.companyName}
                      </p>
                      <p className="text-sm text-slate-500 mt-1 flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(exp.startData).toLocaleDateString()} -{" "}
                        {exp.isWorking
                          ? "Present"
                          : exp.endData
                            ? new Date(exp.endData).toLocaleDateString()
                            : "N/A"}
                      </p>
                      <p className="text-slate-600 mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                        {exp.Description}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-400 pl-4">
                  No work experience listed.
                </p>
              )}
            </div>
          </div>

          {/* Education */}
          <div className="bg-white rounded shadow border p-6 md:p-8 space-y-8">
            <h2 className="text-xl font-bold text-slate-900 border-b pb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" /> Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user?.eductions?.length ? (
                user.eductions.map((edu) => (
                  <div
                    key={edu.id}
                    className="p-5 rounded border border-slate-100 bg-slate-50/30 space-y-2"
                  >
                    <div className="text-xs font-bold text-primary uppercase tracking-wider">
                      {edu.field || "Degree"}
                    </div>
                    <h3 className="font-bold text-slate-900">{edu.major}</h3>
                    <p className="text-sm text-slate-600">{edu.institution}</p>
                    <p className="text-xs text-slate-400">
                      {new Date(edu.startData).getFullYear()} -{" "}
                      {edu.isStudying
                        ? "Present"
                        : edu.endData
                          ? new Date(edu.endData).getFullYear()
                          : "N/A"}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-slate-400">No education history listed.</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Side Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded shadow  p-6 space-y-6">
            <h3 className="font-bold text-slate-900 border-b pb-4">
              Personal Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Email
                  </p>
                  <p className="text-sm font-semibold text-slate-900 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Phone
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {candidate.phone || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold uppercase">
                    Gender
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {candidate.gender || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded shadow p-6 space-y-6">
            <h3 className="font-bold text-slate-900 border-b pb-4">
              Skills & Languages
            </h3>
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5" /> Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {user?.skills?.length ? (
                    user.skills.map((s) => (
                      <Badge
                        key={s.id}
                        variant="secondary"
                        className="px-3 py-1 font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border-none"
                      >
                        {s.skill}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">
                      No skills added.
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                  <Languages className="w-3.5 h-3.5" /> Languages
                </h4>
                <div className="flex flex-wrap gap-2">
                  {user?.languages?.length ? (
                    user.languages.map((l) => (
                      <Badge
                        key={l.id}
                        variant="outline"
                        className="px-3 py-1 font-medium border-primary/20 text-primary"
                      >
                        {l.language}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">
                      No languages added.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
