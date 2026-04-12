import { useState } from "react";
import {
  FileText,
  Eye,
  Bookmark,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileIcon,
  CheckCircle,
  Circle,
  ArrowRight,
} from "lucide-react";

// ── Types ────────────────────────────────────────────────

interface StatCard {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  delta: number;
  iconBg: string;
  iconColor: string;
}

interface Application {
  id: number;
  logo: string;
  title: string;
  company: string;
  location: string;
  status: "INTERVIEWING" | "APPLICATION REVIEW" | "APPLIED";
  progress: number;
}

interface Activity {
  id: number;
  icon: React.ReactNode;
  iconBg: string;
  text: string;
  time: string;
}

interface JobCard {
  id: number;
  logo: string;
  title: string;
  company: string;
  location: string;
  tags: string[];
  salary: string;
}

// ── Data ────────────────────────────────────────────────

const stats: StatCard[] = [
  {
    icon: <FileText className="size-5" />,
    label: "Total Applications",
    value: 42,
    delta: -5,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
  },
  {
    icon: <Eye className="size-5" />,
    label: "Profile Views",
    value: "1,280",
    delta: 12,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-500",
  },
  {
    icon: <Bookmark className="size-5" />,
    label: "Saved Jobs",
    value: 15,
    delta: -2,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-400",
  },
  {
    icon: <CalendarCheck className="size-5" />,
    label: "Interview Invites",
    value: 4,
    delta: 100,
    iconBg: "bg-red-50",
    iconColor: "text-red-400",
  },
];

const applications: Application[] = [
  {
    id: 1,
    logo: "https://logo.clearbit.com/google.com",
    title: "Senior Product Designer",
    company: "Google",
    location: "Mountain View, CA",
    status: "INTERVIEWING",
    progress: 75,
  },
  {
    id: 2,
    logo: "https://logo.clearbit.com/microsoft.com",
    title: "UX Researcher",
    company: "Microsoft",
    location: "Redmond, WA",
    status: "APPLICATION REVIEW",
    progress: 40,
  },
  {
    id: 3,
    logo: "https://logo.clearbit.com/tesla.com",
    title: "Interface Engineer",
    company: "Tesla",
    location: "Palo Alto, CA",
    status: "APPLIED",
    progress: 15,
  },
];

const activities: Activity[] = [
  {
    id: 1,
    icon: <ArrowRight className="size-3.5" />,
    iconBg: "bg-blue-500",
    text: "You applied to Google",
    time: "2 hours ago",
  },
  {
    id: 2,
    icon: <Eye className="size-3.5" />,
    iconBg: "bg-purple-500",
    text: "Microsoft viewed your profile",
    time: "Yesterday at 4:15 PM",
  },
  {
    id: 3,
    icon: <Bookmark className="size-3.5" />,
    iconBg: "bg-green-500",
    text: "New job match found at Netflix",
    time: "Oct 24, 2025",
  },
];

const recommendedJobs: JobCard[] = [
  {
    id: 1,
    logo: "https://logo.clearbit.com/amazon.com",
    title: "Lead Experience Designer",
    company: "Amazon",
    location: "Remote",
    tags: ["Figma", "Prototyping", "Strategy"],
    salary: "$140k – $190k",
  },
  {
    id: 2,
    logo: "https://logo.clearbit.com/google.com",
    title: "Senior Visual Designer",
    company: "Google",
    location: "Zurich, CH",
    tags: ["Typography", "Illustration", "Webflow"],
    salary: "$120k – $160k",
  },
  {
    id: 3,
    logo: "https://logo.clearbit.com/notion.so",
    title: "Interaction Architect",
    company: "Notion",
    location: "New York, NY",
    tags: ["React", "Design Systems"],
    salary: "$160k – $210k",
  },
  {
    id: 4,
    logo: "https://logo.clearbit.com/stripe.com",
    title: "Product Design Lead",
    company: "Stripe",
    location: "San Francisco, CA",
    tags: ["Figma", "Design Systems", "Leadership"],
    salary: "$180k – $230k",
  },
];

// ── Helpers ─────────────────────────────────────────────

const statusStyles: Record<Application["status"], string> = {
  INTERVIEWING: "bg-blue-50 text-blue-600",
  "APPLICATION REVIEW": "bg-yellow-50 text-yellow-600",
  APPLIED: "bg-slate-100 text-slate-500",
};

const progressBarColor = (progress: number) => {
  if (progress >= 70) return "bg-blue-500";
  if (progress >= 35) return "bg-yellow-400";
  return "bg-slate-300";
};

// ── Sub-components ───────────────────────────────────────

function StatCard({ card }: { card: StatCard }) {
  const isPositive = card.delta > 0;
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-border flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-lg ${card.iconBg} ${card.iconColor}`}>
          {card.icon}
        </div>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            isPositive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {card.delta}%
        </span>
      </div>
      <div>
        <p className="text-[color:var(--paragraph)] text-sm">{card.label}</p>
        <p className="text-2xl font-bold text-foreground mt-0.5">
          {card.value}
        </p>
      </div>
    </div>
  );
}

function ApplicationRow({ app }: { app: Application }) {
  return (
    <div className="py-4 border-b border-border last:border-0">
      <div className="flex items-center gap-3">
        <img
          src={app.logo}
          alt={app.company}
          className="size-10 rounded-lg object-contain border border-border p-1 bg-white"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(app.company)}&background=random&size=40`;
          }}
        />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground truncate">
            {app.title}
          </p>
          <p className="text-xs text-[color:var(--paragraph)]">
            {app.company} · {app.location}
          </p>
        </div>
        <span
          className={`text-[10px] font-semibold px-2.5 py-1 rounded-full tracking-wide shrink-0 ${statusStyles[app.status]}`}
        >
          {app.status}
        </span>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <span className="text-xs text-[color:var(--paragraph)]">Progress</span>
        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${progressBarColor(app.progress)}`}
            style={{ width: `${app.progress}%` }}
          />
        </div>
        <span className="text-xs font-semibold text-foreground">
          {app.progress}%
        </span>
      </div>
    </div>
  );
}

// Circular progress SVG
function CircularProgress({ percent }: { percent: number }) {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center size-36">
      <svg className="size-36 -rotate-90" viewBox="0 0 128 128">
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="10"
        />
        <circle
          cx="64"
          cy="64"
          r={r}
          fill="none"
          stroke="white"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700"
        />
      </svg>
      <span className="absolute text-2xl font-bold text-white">{percent}%</span>
    </div>
  );
}

function JobCardItem({ job }: { job: JobCard }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="bg-white rounded-xl p-5 border border-border shadow-sm flex flex-col gap-3 min-w-0">
      <div className="flex items-start justify-between">
        <img
          src={job.logo}
          alt={job.company}
          className="size-10 rounded-lg object-contain border border-border p-1"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://ui-avatars.com/api/?name=${encodeURIComponent(job.company)}&background=random&size=40`;
          }}
        />
        <button
          onClick={() => setSaved((v) => !v)}
          className="text-slate-300 hover:text-primary transition-colors"
          aria-label="Save job"
        >
          <Bookmark
            className={`size-4 ${saved ? "fill-primary text-primary" : ""}`}
          />
        </button>
      </div>
      <div>
        <p className="font-semibold text-sm text-foreground">{job.title}</p>
        <p className="text-xs text-[color:var(--paragraph)] mt-0.5">
          {job.company} · {job.location}
        </p>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
        <span className="text-sm font-semibold text-foreground">
          {job.salary}
        </span>
        <button className="text-xs font-semibold text-primary hover:underline">
          Apply Now
        </button>
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────

export default function CandidateDashboard() {
  const [jobPage, setJobPage] = useState(0);
  const jobsPerPage = 3;
  const totalPages = Math.ceil(recommendedJobs.length / jobsPerPage);
  const visibleJobs = recommendedJobs.slice(
    jobPage * jobsPerPage,
    jobPage * jobsPerPage + jobsPerPage,
  );

  const profileChecklist = [
    { label: "Experience added", done: true },
    { label: "Education history", done: true },
    { label: "Add portfolio links", done: false },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-8">
      {/* ── Stats row ──────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={i} card={s} />
        ))}
      </div>

      {/* ── Middle row ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Active Applications */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border shadow-sm p-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-semibold text-base text-foreground">
              Active Applications
            </h2>
            <button className="text-xs font-semibold text-primary hover:underline">
              View All
            </button>
          </div>
          {applications.map((app) => (
            <ApplicationRow key={app.id} app={app} />
          ))}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Profile Completion */}
          <div
            className="rounded-xl p-5 flex flex-col items-start gap-4"
            style={{
              background: "linear-gradient(135deg, #1a7cff 0%, #1557d4 100%)",
            }}
          >
            <div>
              <h2 className="font-semibold text-white text-base">
                Profile Completion
              </h2>
              <p className="text-xs text-blue-100 mt-0.5">
                Complete your profile to get 3x more recruiter views.
              </p>
            </div>
            <div className="flex justify-center w-full">
              <CircularProgress percent={80} />
            </div>
            <ul className="space-y-1.5 w-full">
              {profileChecklist.map((item) => (
                <li key={item.label} className="flex items-center gap-2">
                  {item.done ? (
                    <CheckCircle className="size-4 text-green-300 shrink-0" />
                  ) : (
                    <Circle className="size-4 text-blue-200 shrink-0" />
                  )}
                  <span
                    className={`text-sm ${
                      item.done ? "text-blue-100" : "text-blue-200"
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
            <button className="w-full bg-white text-blue-600 font-semibold text-sm py-2 rounded-lg hover:bg-blue-50 transition-colors">
              Finish Profile
            </button>
          </div>

          {/* Resume Upload */}
          <div className="bg-white rounded-xl border border-border shadow-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-base text-foreground">
                Resume Upload
              </h2>
              <Upload className="size-4 text-[color:var(--paragraph)]" />
            </div>
            <div className="border-2 border-dashed border-border rounded-lg p-5 flex flex-col items-center gap-2 text-center cursor-pointer hover:bg-slate-50 transition-colors">
              <FileIcon className="size-8 text-slate-300" />
              <p className="text-sm font-medium text-foreground">
                Update Resume
              </p>
              <p className="text-xs text-[color:var(--paragraph)]">
                PDF, DOCX up to 10MB
              </p>
            </div>
            <div className="flex items-center justify-between mt-3 bg-slate-50 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-primary" />
                <span className="text-xs font-medium text-foreground">
                  Alex_Resume_V2.pdf
                </span>
              </div>
              <span className="text-xs text-[color:var(--paragraph)]">
                2 days ago
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Activity ─────────────────────────────── */}
      <div className="bg-white rounded-xl border border-border shadow-sm p-5">
        <h2 className="font-semibold text-base text-foreground mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {activities.map((a) => (
            <div key={a.id} className="flex items-center gap-3">
              <div
                className={`size-7 rounded-full flex items-center justify-center text-white shrink-0 ${a.iconBg}`}
              >
                {a.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{a.text}</p>
              </div>
              <span className="text-xs text-[color:var(--paragraph)] shrink-0">
                {a.time}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Recommended Jobs ────────────────────────────── */}
      <div>
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-semibold text-base text-foreground">
              Recommended for you
            </h2>
            <p className="text-xs text-[color:var(--paragraph)] mt-0.5">
              Based on your skills and preferences
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setJobPage((p) => Math.max(0, p - 1))}
              disabled={jobPage === 0}
              className="size-8 rounded-full border border-border flex items-center justify-center text-[color:var(--paragraph)] hover:bg-slate-50 disabled:opacity-30 transition-colors"
              aria-label="Previous jobs"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={() => setJobPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={jobPage >= totalPages - 1}
              className="size-8 rounded-full border border-border flex items-center justify-center text-[color:var(--paragraph)] hover:bg-slate-50 disabled:opacity-30 transition-colors"
              aria-label="Next jobs"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleJobs.map((job) => (
            <JobCardItem key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
