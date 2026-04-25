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
            variant="secondary"
            size="sm"
            className="absolute top-4 left-4 bg-white/80 backdrop-blur"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
        </Container>
      </div>

      <Container className="-mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 border-white shadow-md overflow-hidden bg-white shrink-0">
                <img
                  src={company.logo || "/placeholder-company.png"}
                  className="w-full h-full object-contain"
                  alt={company.user?.name}
                />
              </div>
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                    {company.user?.name}
                  </h1>
                  <p className="text-primary font-medium">{company.industry}</p>
                </div>
                <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    {company.location}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-slate-400" />
                    {company.companySize} Employees
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-4 h-4 text-slate-400" />
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary transition-colors"
                    >
                      Website
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-bold text-slate-900 border-b pb-4">
                About Company
              </h2>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                {company.description || "No description provided."}
              </div>
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
                      className="bg-white rounded-xl border p-4 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/job/${job.id}`)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-900 hover:text-primary transition-colors">
                            {job.title}
                          </h3>
                          <div className="flex gap-4 mt-2 text-sm text-slate-500">
                            <span className="flex items-center gap-1">
                              <Briefcase className="w-4 h-4" /> {job.jobType}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" /> {job.locationType}
                            </span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-xl border border-dashed p-8 text-center text-slate-500">
                  No active job openings at the moment.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
              <h3 className="font-bold text-slate-900 border-b pb-4">
                Company Overview
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">
                      Founded
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {company.foundedDate || "N/A"}
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
                      {company.phone || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">
                      Email
                    </p>
                    <p className="text-sm font-semibold text-slate-900">
                      {company.user?.email || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 rounded-xl p-6 border border-primary/20 space-y-4">
              <h3 className="font-bold text-primary">
                Interested in this company?
              </h3>
              <p className="text-sm text-slate-600">
                Follow them to get notified about new job opportunities and
                updates.
              </p>
              <Button className="w-full">Follow Company</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
