export default function RecruiterProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">
          Company Profile
        </h1>
        <p className="text-sm text-slate-500">
          Manage your company's public information and branding.
        </p>
      </div>

      <div className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <p className="text-slate-500">
          Company profile management content will go here.
        </p>
      </div>
    </div>
  );
}
