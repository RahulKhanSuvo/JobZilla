import { useState } from "react";
import { useForm, useWatch, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Eye, EyeOff, User, Mail, Briefcase, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { signUpSchema, type signUpFormData } from "./authSchema";
import { useSignUpMutation } from "@/redux/features/auth/auth.api";
import { errorToast } from "@/utils/errorToast";
import JobzillaLogo from "@/components/common/JobzillaLogo";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [userSignUp, { isLoading }] = useSignUpMutation();

  const form = useForm<signUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { role: "CANDIDATE" },
  });

  const selectedRole = useWatch({
    control: form.control,
    name: "role",
  });

  const onSubmit: SubmitHandler<signUpFormData> = async (data) => {
    console.log("userSignUp", data);
    try {
      await userSignUp(data).unwrap();
      toast.success("Account created successfully! Please log in.");
      form.reset({ role: selectedRole } as Partial<signUpFormData>);
      navigate("/auth/login");
    } catch (error) {
      errorToast(error);
    }
  };

  const switchRole = (role: "CANDIDATE" | "EMPLOYER") => {
    if (role === "CANDIDATE") {
      form.reset({
        role: "CANDIDATE",
        name: "",
        email: "",
        password: "",
      });
    } else {
      form.reset({
        role: "EMPLOYER",
        name: "",
        email: "",
        password: "",
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
      {/* Subtle modern background elements */}
      <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors duration-500" />
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] bg-size-[30px_30px]" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 dark:bg-purple-500/5 blur-[100px] pointer-events-none" />

      {/* Main floating card */}
      <div className="relative z-10 flex w-full max-w-6xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl dark:shadow-slate-950/50 border border-slate-200/50 dark:border-slate-800/50 h-[800px] max-h-[95vh]">
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
              Your future <br />
              <span className="text-indigo-300">starts here.</span>
            </h3>
            <p className="text-lg text-slate-200 font-medium max-w-md drop-shadow-md">
              Connect with the world's most innovative companies and take the
              next leap in your professional journey.
            </p>
          </div>
        </div>

        {/* Right column: Form Area */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-12 overflow-y-auto bg-white dark:bg-slate-900">
          <div className="w-full max-w-xl">
            {/* Top nav */}
            <nav className="flex items-center justify-end gap-6 text-sm mb-8">
              <Link
                to="/auth/login"
                className="border border-border rounded-full px-4 py-1.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                Sign In
              </Link>
            </nav>

            {/* Form area */}
            <h1 className="text-3xl font-bold text-foreground">
              Create Account
            </h1>
            <p className="mt-1 text-paragraph text-sm">
              Join thousands of professionals on JobNest.
            </p>

            {/* Role toggle */}
            <div className="mt-6 flex rounded-full border border-border bg-muted p-1 w-full">
              <button
                type="button"
                onClick={() => switchRole("CANDIDATE")}
                className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-full transition-all duration-200 ${
                  selectedRole === "CANDIDATE"
                    ? "bg-white text-primary shadow-sm"
                    : "text-paragraph hover:text-foreground"
                }`}
              >
                <User className="size-4" />
                I&apos;m a Candidate
              </button>
              <button
                type="button"
                onClick={() => switchRole("EMPLOYER")}
                className={`flex-1 flex items-center justify-center gap-2 text-sm font-medium py-2 rounded-full transition-all duration-200 ${
                  selectedRole === "EMPLOYER"
                    ? "bg-white text-primary shadow-sm"
                    : "text-paragraph hover:text-foreground"
                }`}
              >
                <Briefcase className="size-4" />
                I&apos;m an Employer
              </button>
            </div>

            {/* Form */}
            <form
              id="signup-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-6"
            >
              <FieldGroup className="gap-4">
                {selectedRole === "CANDIDATE" ? (
                  <>
                    {/* Full Name */}
                    <Field>
                      <FieldLabel
                        htmlFor="name"
                        className="text-xs font-semibold text-paragraph tracking-wide uppercase"
                      >
                        Full Name
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id="name"
                          type="text"
                          placeholder="Alex Thompson"
                          aria-invalid={
                            !!(form.formState.errors as Record<string, unknown>)
                              .name
                          }
                          className="pr-10"
                          {...form.register("name" as never)}
                        />
                        <User className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      </div>
                      {(
                        form.formState.errors as Record<
                          string,
                          { message?: string }
                        >
                      ).name && (
                        <FieldError
                          errors={[
                            (
                              form.formState.errors as Record<
                                string,
                                { message?: string }
                              >
                            ).name,
                          ]}
                        />
                      )}
                    </Field>

                    {/* Email */}
                    <Field>
                      <FieldLabel
                        htmlFor="email"
                        className="text-xs font-semibold text-paragraph tracking-wide uppercase"
                      >
                        Email Address
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id="email"
                          type="email"
                          placeholder="alex@example.com"
                          aria-invalid={!!form.formState.errors.email}
                          className="pr-10"
                          {...form.register("email")}
                        />
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      </div>
                      {form.formState.errors.email && (
                        <FieldError errors={[form.formState.errors.email]} />
                      )}
                    </Field>
                    {/* Password */}
                    <Field>
                      <FieldLabel
                        htmlFor="password"
                        className="text-xs font-semibold text-paragraph tracking-wide uppercase"
                      >
                        Password
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Min. 6 characters"
                          aria-invalid={!!form.formState.errors.password}
                          className="pr-10"
                          {...form.register("password")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                      {form.formState.errors.password && (
                        <FieldError errors={[form.formState.errors.password]} />
                      )}
                    </Field>
                  </>
                ) : (
                  <>
                    {/* Company Name */}
                    <Field>
                      <FieldLabel
                        htmlFor="companyName"
                        className="text-xs font-semibold text-paragraph tracking-wide uppercase"
                      >
                        Company Name
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id="companyName"
                          type="text"
                          placeholder="Acme Inc."
                          aria-invalid={
                            !!(form.formState.errors as Record<string, unknown>)
                              .name
                          }
                          className="pr-10"
                          {...form.register("name" as never)}
                        />
                        <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      </div>
                      {(
                        form.formState.errors as Record<
                          string,
                          { message?: string }
                        >
                      ).name && (
                        <FieldError
                          errors={[
                            (
                              form.formState.errors as Record<
                                string,
                                { message?: string }
                              >
                            ).name,
                          ]}
                        />
                      )}
                    </Field>

                    {/* Email */}
                    <Field>
                      <FieldLabel
                        htmlFor="employer-email"
                        className="text-xs font-semibold text-paragraph tracking-wide uppercase"
                      >
                        Email Address
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id="employer-email"
                          type="email"
                          placeholder="hr@company.com"
                          aria-invalid={!!form.formState.errors.email}
                          className="pr-10"
                          {...form.register("email")}
                        />
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
                      </div>
                      {form.formState.errors.email && (
                        <FieldError errors={[form.formState.errors.email]} />
                      )}
                    </Field>

                    {/* Password */}
                    <Field>
                      <FieldLabel
                        htmlFor="employer-password"
                        className="text-xs font-semibold text-paragraph tracking-wide uppercase"
                      >
                        Password
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          id="employer-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Min. 6 characters"
                          aria-invalid={!!form.formState.errors.password}
                          className="pr-10"
                          {...form.register("password")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="size-4" />
                          ) : (
                            <Eye className="size-4" />
                          )}
                        </button>
                      </div>
                      {form.formState.errors.password && (
                        <FieldError errors={[form.formState.errors.password]} />
                      )}
                    </Field>
                  </>
                )}
              </FieldGroup>

              {/* Submit */}
              <Button
                type="submit"
                form="signup-form"
                size="lg"
                className="w-full mt-6 rounded-lg text-base font-semibold"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account…" : "Create Account"}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 mt-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-paragraph uppercase tracking-wide">
                or register with
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-border rounded-lg py-2.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                {/* Google SVG */}
                <svg className="size-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-border rounded-lg py-2.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                {/* LinkedIn SVG */}
                <svg className="size-4" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </button>
            </div>

            {/* Login link */}
            <p className="text-center text-sm text-paragraph mt-6">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-primary font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
