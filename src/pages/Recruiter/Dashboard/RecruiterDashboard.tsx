export default function RecruiterDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Recruiter Dashboard
        </h1>
        <p className="text-sm text-slate-500">
          Overview of your job postings and latest applicant activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Active Jobs
          </h3>
          <p className="text-3xl font-bold mt-2">12</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Total Applicants
          </h3>
          <p className="text-3xl font-bold mt-2">148</p>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-medium text-slate-500 uppercase tracking-wider">
            Interviews
          </h3>
          <p className="text-3xl font-bold mt-2">24</p>
        </div>
      </div>
    </div>
  );
}
