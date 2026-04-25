import { useParams, useNavigate } from "react-router";
import { useGetCompanyByIdQuery } from "@/redux/features/recruiter/recruiter.api";
import Container from "@/components/common/Container";
import {
  MapPin,
  Globe,
  Users,
  Phone,
  Mail,
  Calendar,
  Briefcase,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import JobzillaLoading from "@/components/common/JobzillaLoading";
import { Badge } from "@/components/ui/badge";

export default function CompanyPublicProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: response,
    isLoading,
    isError,
  } = useGetCompanyByIdQuery(id!, { skip: !id });

  const company = response?.data;

  if (isLoading) return <JobzillaLoading />;

  if (isError || !company) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">
            Company Not Found
          </h2>
          <Button onClick={() => navigate(-1)}>Go Back</Button>
        </div>
      </div>
    );
  }

  const jobs = company.user?.jobs || [];

  return (
    <div className="pb-20">
      {/* Banner */}
      <div className="h-48 md:h-64 bg-slate-100 relative">
        {company.coverImage ? (
          <img
            src={company.coverImage}
            className="w-full h-full object-cover"
            alt="Banner"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-r from-primary/20 to-blue-500/20" />
        )}
        <Container className="relative h-full">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-4 left-4 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md border border-white/20 dark:border-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800 transition-all rounded font-bold text-xs"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
          </Button>
        </Container>
      </div>

      <Container className="-mt-16 md:-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 md:p-8 relative">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Logo container - Absolute on desktop/mobile for consistent overlap */}
                <div className="absolute -top-12 md:-top-20 left-6 md:left-8">
                  <div className="w-24 h-24 md:w-40 md:h-40 rounded border-4 border-white dark:border-slate-800 shadow overflow-hidden bg-white dark:bg-slate-900 p-1">
                    <img
                      src={company.logo || "/placeholder-company.png"}
                      className="w-full h-full object-contain rounded"
                      alt={company.user?.name}
                    />
                  </div>
                </div>

                {/* Info container - Pushed down/right to make room for absolute logo */}
                <div className="mt-16 md:mt-0 md:ml-48 flex-1 space-y-4 pb-2">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {company.user?.name}
                      </h1>
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none px-3 py-1 font-bold text-xs uppercase tracking-wider">
                        Verified
                      </Badge>
                    </div>
                    <p className="text-lg text-primary font-bold">
                      {company.industry}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      {company.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      {company.companySize} Employees
                    </div>
                    <div className="flex items-center gap-2 underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-all">
                      <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800">
                        <Globe className="w-3.5 h-3.5 text-slate-400" />
                      </div>
                      <a
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Visit Website
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded shadow-sm border border-slate-100 dark:border-slate-800 p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-4">
                About Company
              </h2>
              <div
                className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: company.description || "No description provided.",
                }}
              />
            </div>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-slate-900">
                Current Openings
              </h2>
              {jobs.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {jobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-white dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800 p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/job/${job.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex gap-4 mt-2 text-sm text-slate-500 font-medium">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4 text-slate-400" />{" "}
                              {job.jobType}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-slate-400" />{" "}
                              {job.locationType}
                            </span>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded font-bold text-xs uppercase"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 dark:bg-slate-800/20 rounded border border-dashed border-slate-200 dark:border-slate-800 p-8 text-center text-slate-500 font-medium">
                  No active job openings at the moment.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6 z-50 relative">
            <div className="bg-white dark:bg-slate-900 rounded shadow-sm border border-slate-100 dark:border-slate-800 p-6 space-y-6">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 border-b border-slate-100 dark:border-slate-800 pb-4 uppercase text-xs tracking-widest">
                Company Overview
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Founded
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200">
                      {company.foundedDate || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center z-50 relative gap-4">
                  <div className="w-10 h-10 rounded bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Phone
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200">
                      {company.phone || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center z-50 relative gap-4">
                  <div className="w-10 h-10 rounded bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Email
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200">
                      {company.user?.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 dark:bg-primary/10 rounded p-6 border border-primary/20 space-y-4">
              <h3 className="font-bold text-primary uppercase text-xs tracking-widest">
                Interested in this company?
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Follow them to get notified about new job opportunities and
                updates.
              </p>
              <Button className="w-full rounded font-bold uppercase text-xs">
                Follow Company
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
