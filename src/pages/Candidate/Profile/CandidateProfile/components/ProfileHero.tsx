import type { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Github,
  Facebook,
  Pencil,
  Briefcase,
  BookOpen,
  Star,
} from "lucide-react";
import type { AuthUser } from "@/redux/features/auth/auth.type";
import { Link } from "react-router";
import { calculateProfileCompletion } from "@/utils/profileCompletion";

interface ProfileHeroProps {
  data: AuthUser;
}

const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  REMOTE: "Remote",
  HYBRID: "Hybrid",
};

const CAREER_LABELS: Record<string, string> = {
  ENTRY_LEVEL: "Entry Level",
  MID_LEVEL: "Mid Level",
  SENIOR_LEVEL: "Senior Level",
  EXECUTIVE_LEVEL: "Executive Level",
};

const ProfileHero: FC<ProfileHeroProps> = ({ data }) => {
  const candidate = data.candidate;
  const { percentage } = calculateProfileCompletion(data);

  const experienceCount = data.workExperiences?.length ?? 0;
  const educationCount = data.eductions?.length ?? 0;
  const skillsCount = data.skills?.length ?? 0;

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-slate-900 border border-border/30">
      {/* Cover Banner */}
      <div className="relative h-44 md:h-56 bg-gradient-to-br from-primary via-primary/80 to-indigo-600">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {/* Edit Button top-right */}
        <div className="absolute top-4 right-4">
          <Button
            asChild
            size="sm"
            className="bg-white/20 hover:bg-white/30 backdrop-blur border border-white/30 text-white font-semibold gap-1.5 rounded-lg shadow"
          >
            <Link to="edit">
              <Pencil className="size-3.5" />
              Edit Profile
            </Link>
          </Button>
        </div>

        {/* Progress bar at bottom of banner */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-white transition-all duration-1000 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Main Info */}
      <div className="px-6 md:px-10 pb-8">
        {/* Avatar Row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 -mt-14 mb-6">
          <Avatar className="size-28 md:size-32 border-4 border-white dark:border-slate-900 shadow-xl bg-white">
            <AvatarImage src={candidate?.avatar || ""} alt={data.name} />
            <AvatarFallback className="text-4xl font-black bg-gradient-to-br from-primary/20 to-indigo-100 text-primary">
              {data.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          {/* Profile completeness pill */}
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-full px-4 py-1.5 self-start sm:self-auto sm:-mb-0 mt-2 sm:mt-0">
            <span className="size-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-semibold text-green-700 dark:text-green-400">
              {percentage}% Complete
            </span>
          </div>
        </div>

        {/* Name & headline */}
        <div className="space-y-1 mb-4">
          <h1 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
            {data.name}
          </h1>
          {(candidate?.preferredJobType || candidate?.preferredCareerLevel) && (
            <p className="text-muted-foreground font-medium">
              {candidate?.preferredCareerLevel
                ? (CAREER_LABELS[candidate.preferredCareerLevel] ??
                  candidate.preferredCareerLevel)
                : ""}
              {candidate?.preferredJobType && candidate?.preferredCareerLevel
                ? " · "
                : ""}
              {candidate?.preferredJobType
                ? (JOB_TYPE_LABELS[candidate.preferredJobType] ??
                  candidate.preferredJobType)
                : ""}
            </p>
          )}
        </div>

        {/* Contact badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {candidate?.location && (
            <Badge
              variant="secondary"
              className="gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-0 font-normal"
            >
              <MapPin className="size-3.5 text-primary" />
              {candidate.location}
            </Badge>
          )}
          {data.email && (
            <Badge
              variant="secondary"
              className="gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-0 font-normal"
            >
              <Mail className="size-3.5 text-primary" />
              {data.email}
            </Badge>
          )}
          {(candidate?.phone || data.phone) && (
            <Badge
              variant="secondary"
              className="gap-1.5 px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-0 font-normal"
            >
              <Phone className="size-3.5 text-primary" />
              {candidate?.phone || data.phone}
            </Badge>
          )}
        </div>

        {/* Social Links */}
        {(candidate?.linkedin || candidate?.github || candidate?.facebook) && (
          <div className="flex items-center gap-3 mb-6">
            {candidate?.linkedin && (
              <a
                href={candidate.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all duration-200"
              >
                <Linkedin className="size-4" />
              </a>
            )}
            {candidate?.github && (
              <a
                href={candidate.github}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all duration-200"
              >
                <Github className="size-4" />
              </a>
            )}
            {candidate?.facebook && (
              <a
                href={candidate.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-primary hover:text-white transition-all duration-200"
              >
                <Facebook className="size-4" />
              </a>
            )}
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors">
            <Briefcase className="size-5 text-primary" />
            <span className="text-xl font-black text-foreground">
              {experienceCount}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {experienceCount === 1 ? "Experience" : "Experiences"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors">
            <BookOpen className="size-5 text-indigo-500" />
            <span className="text-xl font-black text-foreground">
              {educationCount}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {educationCount === 1 ? "Education" : "Educations"}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors">
            <Star className="size-5 text-amber-500" />
            <span className="text-xl font-black text-foreground">
              {skillsCount}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              {skillsCount === 1 ? "Skill" : "Skills"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHero;
