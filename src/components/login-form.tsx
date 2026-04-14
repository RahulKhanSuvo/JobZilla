import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginSchema } from "@/pages/auth/authSchema";
import type { LoginFormData } from "@/pages/auth/authSchema";
import { toast } from "sonner";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { errorToast } from "@/utils/errorToast";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/features/auth/authSlice";
import { Link, useNavigate } from "react-router";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { useForm } from "@tanstack/react-form";
import { zodValidator, type ZodValidator } from "@tanstack/zod-form-adapter";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [signIn, { isLoading }] = useLoginMutation();
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const form = useForm<LoginFormData, ZodValidator>({
    defaultValues: {
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: loginSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { data } = await signIn(value).unwrap();
        toast.success("Login successful");
        dispatch(setCredentials({ user: data.user, token: data.accessToken }));
        switch (data.user.role) {
          case "EMPLOYER":
            navigate("/recruiter", { replace: true });
            break;
          case "CANDIDATE":
            navigate("/candidate", { replace: true });
            break;
          case "ADMIN":
            navigate("/admin", { replace: true });
            break;
        }
        form.reset();
      } catch (error) {
        errorToast(error);
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-transparent shadow-none border-none w-full ">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-3xl font-extrabold mb-4">Log In</CardTitle>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-md text-[13px] text-left border border-slate-100 dark:border-slate-800 space-y-1">
            <p className="text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Username:
              </span>{" "}
              candidate or employer
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              <span className="font-medium text-slate-700 dark:text-slate-300">
                Password:
              </span>{" "}
              jobtex
            </p>
          </div>
        </CardHeader>
        <CardContent className="w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup className="space-y-4">
              <form.Field
                name="email"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel
                      className="text-slate-900 dark:text-white font-semibold text-sm"
                      htmlFor={field.name}
                    >
                      Username or email address
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type="email"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="candidate"
                        className="h-12 border border-slate-200 dark:border-slate-800 rounded-md focus:border-primary focus:ring-0 transition-all"
                        aria-invalid={!!field.state.meta.errors.length}
                      />
                    </div>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="password"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel
                      className="text-slate-900 dark:text-white font-semibold text-sm"
                      htmlFor={field.name}
                    >
                      Password<span className="text-red-500">*</span>
                    </FieldLabel>
                    <div className="relative">
                      <Input
                        id={field.name}
                        name={field.name}
                        type={passwordShow ? "text" : "password"}
                        placeholder="••••••"
                        className="h-12 border border-slate-200 dark:border-slate-800 rounded-md focus:border-primary focus:ring-0 transition-all pr-10"
                        aria-invalid={!!field.state.meta.errors.length}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                      />
                      <div
                        onClick={() => setPasswordShow(!passwordShow)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        {passwordShow ? (
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

              <div className="flex justify-between items-center text-sm">
                <div className="flex gap-2 items-center cursor-pointer group">
                  <Checkbox className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                  <span className="text-slate-500 dark:text-slate-400 group-hover:text-slate-700 transition-colors">
                    Remember me
                  </span>
                </div>
                <Link
                  className="text-primary font-medium hover:underline"
                  to={"/forget"}
                >
                  Fogot password?
                </Link>
              </div>
              <Field className="pt-2">
                <Button
                  className="h-12 w-full bg-[#139a74] hover:bg-emerald-700 text-white font-bold text-lg rounded-md transition-all active:scale-95"
                  type="submit"
                >
                  {isLoading ? "Logging..." : "Login"}
                </Button>
                <div className="text-center text-sm text-slate-500 mt-4">
                  Not registered yet?{" "}
                  <Link
                    to={"/auth/sign-up"}
                    className="text-slate-900 dark:text-white font-bold hover:underline"
                  >
                    Sign Up
                  </Link>
                </div>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
