import DashboardTitle from "@/components/common/DashboardTitle";
import CommonWrapper from "@/components/common/CommonWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Plus,
  Users,
  Check,
  RotateCcw,
  Download,
  MapPin,
} from "lucide-react";
import { useGetAllApplicationsQuery } from "@/redux/features/recruiter/application.api";

const stats = [
  {
    label: "Total Applicants",
    value: "1,235",
    icon: Users,
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "Shortlisted",
    value: "112",
    icon: Check,
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    label: "Rejected",
    value: "12",
    icon: RotateCcw,
    color: "bg-red-50 text-red-600",
  },
];

const applicants = [
  {
    id: 1,
    name: "Arlene McCoy",
    role: "Computational Wizard",
    location: "Tokyo, Japan",
    status: "Approved",
    appliedDate: "December 18, 2023",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arlene",
    available: true,
  },
  {
    id: 2,
    name: "Mrs Dianne Russell",
    role: "Computational Wizard",
    location: "Tokyo, Japan",
    status: "Approved",
    appliedDate: "December 18, 2023",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dianne",
    available: true,
  },
  {
    id: 3,
    name: "Mr Guy Hawkins",
    role: "Computational Wizard",
    location: "Tokyo, Japan",
    status: "Pending",
    appliedDate: "December 18, 2023",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Guy",
    available: true,
  },
  {
    id: 4,
    name: "Lady Darlene Robertson",
    role: "Computational Wizard",
    location: "Tokyo, Japan",
    status: "Pending",
    appliedDate: "December 18, 2023",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Darlene",
    available: true,
  },
];

export default function AllApplicants() {
  const { data: applications } = useGetAllApplicationsQuery();
  console.log(applications);
  return (
    <div className="space-y-8 pb-12">
      <DashboardTitle>Applicants Jobs</DashboardTitle>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <CommonWrapper
            key={index}
            className="px-6 py-6 flex items-center gap-5"
          >
            <div
              className={`size-14 rounded-2xl flex items-center justify-center ${stat.color}`}
            >
              <stat.icon className="size-7" />
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 font-medium mt-1">
                {stat.label}
              </p>
            </div>
          </CommonWrapper>
        ))}
      </div>

      {/* Search and Sort */}
      <CommonWrapper className="p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400" />
          <Input
            placeholder="Search"
            className="pl-12 h-12 bg-slate-50/50 border-none rounded-xl"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-sm text-slate-500 font-medium whitespace-nowrap">
            Sort by:
          </span>
          <Select defaultValue="default">
            <SelectTrigger className="h-12 border-none bg-slate-50/50 rounded-xl px-4 min-w-[160px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CommonWrapper>

      {/* Recent Applicants Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-slate-900 px-1">
          Recent Applicants
        </h3>

        <CommonWrapper className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest w-[40%]">
                    Candidates
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Status
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    Applied Date
                  </th>
                  <th className="px-8 py-5 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {applicants.map((applicant) => (
                  <tr
                    key={applicant.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={applicant.image}
                          alt={applicant.name}
                          className="size-14 rounded-full bg-slate-100"
                        />
                        <div className="space-y-1">
                          <p className="text-xs font-bold text-emerald-600 uppercase tracking-tight">
                            {applicant.role}
                          </p>
                          <h4 className="text-[17px] font-bold text-slate-900 leading-tight">
                            {applicant.name}
                          </h4>
                          <div className="flex items-center gap-3">
                            {applicant.available && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-600">
                                Available now
                              </span>
                            )}
                            <div className="flex items-center gap-1.5 text-slate-400">
                              <MapPin className="size-3.5" />
                              <span className="text-xs font-medium">
                                {applicant.location}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold ${
                          applicant.status === "Approved"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {applicant.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm text-slate-500 font-medium">
                      {applicant.appliedDate}
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-10 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                          <Plus className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-10 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                          <Check className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-10 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                          <RotateCcw className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-10 bg-slate-50 text-slate-500 hover:bg-slate-100 rounded-lg"
                        >
                          <Download className="size-4" />
                        </Button>
                        <Button
                          variant="outline"
                          className="h-10 px-4 border-emerald-500 text-emerald-600 font-bold hover:bg-emerald-50 rounded-lg ml-2"
                        >
                          View Applicant
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CommonWrapper>
      </div>
    </div>
  );
}
