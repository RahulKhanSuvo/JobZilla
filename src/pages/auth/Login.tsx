import { LoginForm } from "@/components/login-form";
import JobzillaLogo from "@/components/common/JobzillaLogo";

export default function Login() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Subtle modern background elements */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500" />
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[30px_30px]" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[100px] pointer-events-none" />

      {/* Main floating card */}
      <div className="relative z-10 flex w-full max-w-6xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl dark:shadow-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 min-h-[700px]">
        {/* Left column: 3D Illustration & Branding */}
        <div className="hidden lg:flex lg:w-1/2 relative p-12 flex-col justify-between">
          <div className="absolute inset-0">
            <img
              src="/src/assets/images/login-hero-3d.png"
              alt="Job Portal Career Growth"
              className="w-full h-full object-cover"
            />
            {/* Elegant dark overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-900/30 to-slate-900/10" />
          </div>

          <div className="relative z-10 flex items-center gap-2 mix-blend-plus-lighter">
            <JobzillaLogo className="text-white drop-shadow-md brightness-0 invert" />
          </div>

          <div className="relative z-10 text-white space-y-4">
            <h3 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight drop-shadow-lg">
              Unlock Your <br />
              <span className="text-indigo-300">Career Potential</span>
            </h3>
            <p className="text-lg text-slate-200 font-medium max-w-md drop-shadow-md">
              Join thousands of professionals finding new opportunities,
              networking, and achieving their career goals.
            </p>
          </div>
        </div>

        {/* Right column: Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 overflow-y-auto bg-white dark:bg-slate-900">
          <LoginForm className="w-full max-w-[480px]" />
        </div>
      </div>
    </div>
  );
}
