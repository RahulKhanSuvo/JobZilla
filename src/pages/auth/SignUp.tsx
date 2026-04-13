import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { Eye, EyeClosed } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { zodValidator, type ZodValidator } from "@tanstack/zod-form-adapter";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { signUpSchema, type signUpFormData } from "./authSchema";
import { useSignUpMutation } from "@/redux/features/auth/auth.api";
import { errorToast } from "@/utils/errorToast";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userSignUp, { isLoading }] = useSignUpMutation();

  const form = useForm<signUpFormData, ZodValidator>({
    defaultValues: {
      role: "CANDIDATE",
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: signUpSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await userSignUp(value).unwrap();
        toast.success("Account created successfully! Please log in.");
        navigate("/auth/login");
      } catch (error) {
        errorToast(error);
      }
    },
  });

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950 font-sans">
      <div className="w-full max-w-[500px] flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-foreground text-center mb-6">
          Create a free account
        </h1>

        {/* Role Toggle */}
        <div className="flex gap-4 w-full mb-8">
          <form.Subscribe
            selector={(state) => state.values.role}
            children={(role) => (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className={`flex-1 h-12 font-bold transition-all ${
                    role === "CANDIDATE"
                      ? "bg-slate-100 border-transparent text-slate-900 shadow-sm"
                      : "bg-transparent text-slate-400 border-slate-100 hover:bg-slate-50"
                  }`}
                  onClick={() => form.setFieldValue("role", "CANDIDATE")}
                >
                  Candidate
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className={`flex-1 h-12 font-bold transition-all ${
                    role === "EMPLOYER"
                      ? "bg-emerald-50 border-transparent text-emerald-600 shadow-sm"
                      : "bg-transparent text-slate-400 border-slate-100 hover:bg-slate-50"
                  }`}
                  onClick={() => form.setFieldValue("role", "EMPLOYER")}
                >
                  Employer
                </Button>
              </>
            )}
          />
        </div>

        {/* Form Container */}
        <form
          className="w-full space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-4">
            {/* Full Name / Company Name */}
            <form.Field
              name="name"
              children={(field) => (
                <Field data-invalid={!!field.state.meta.errors.length}>
                  <form.Subscribe
                    selector={(state) => state.values.role}
                    children={(role) => (
                      <FieldLabel className="text-slate-900 dark:text-white font-semibold text-sm">
                        {role === "CANDIDATE" ? "Full Name" : "Company Name"}
                        <span className="text-red-500">*</span>
                      </FieldLabel>
                    )}
                  />
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Tony Nguyen"
                      className="h-12 border border-slate-200 dark:border-slate-800 rounded-md focus:border-primary focus:ring-0 transition-all"
                      aria-invalid={!!field.state.meta.errors.length}
                    />
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Email */}
            <form.Field
              name="email"
              children={(field) => (
                <Field data-invalid={!!field.state.meta.errors.length}>
                  <FieldLabel className="text-slate-900 dark:text-white font-semibold text-sm">
                    Email Address<span className="text-red-500">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="tony@example.com"
                      className="h-12 border border-slate-200 dark:border-slate-800 rounded-md focus:border-primary focus:ring-0 transition-all"
                      aria-invalid={!!field.state.meta.errors.length}
                    />
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Password */}
            <form.Field
              name="password"
              children={(field) => (
                <Field data-invalid={!!field.state.meta.errors.length}>
                  <FieldLabel className="text-slate-900 dark:text-white font-semibold text-sm">
                    Password<span className="text-red-500">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                      className="h-12 border border-slate-200 dark:border-slate-800 rounded-md focus:border-primary focus:ring-0 transition-all pr-10"
                      aria-invalid={!!field.state.meta.errors.length}
                    />
                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeClosed size={20} />
                      )}
                    </div>
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            {/* Confirm Password */}
            <form.Field
              name="confirmPassword"
              children={(field) => (
                <Field data-invalid={!!field.state.meta.errors.length}>
                  <FieldLabel className="text-slate-900 dark:text-white font-semibold text-sm">
                    Confirm Password<span className="text-red-500">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showConfirmPassword ? "text" : "password"}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="••••••••"
                      className="h-12 border border-slate-200 dark:border-slate-800 rounded-md focus:border-primary focus:ring-0 transition-all pr-10"
                      aria-invalid={!!field.state.meta.errors.length}
                    />
                    <div
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showConfirmPassword ? (
                        <Eye size={20} />
                      ) : (
                        <EyeClosed size={20} />
                      )}
                    </div>
                  </div>
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />
          </FieldGroup>

          {/* Terms Checkbox */}
          <div className="flex gap-2 items-center text-sm py-2">
            <Checkbox className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
            <span className="text-slate-500 dark:text-slate-400">
              I agree to the{" "}
              <Link to="/terms" className="text-primary hover:underline">
                Terms of User
              </Link>
            </span>
          </div>

          {/* Register Button */}
          <Button
            type="submit"
            className="h-12 w-full bg-[#139a74] hover:bg-emerald-700 text-white font-bold text-lg rounded-md transition-all active:scale-95 shadow-lg shadow-emerald-500/10"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Register"}
          </Button>

          {/* Login Link */}
          <div className="text-center text-sm text-slate-500 mt-6 pb-8">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              className="text-slate-900 dark:text-white font-bold hover:underline"
            >
              Login Here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
