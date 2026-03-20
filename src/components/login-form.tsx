import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
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
import { AtSign, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [signIn, { isLoading }] = useLoginMutation();
  const [passwordShow, setPasswordShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = async (formData: LoginFormData) => {
    try {
      const { data } = await signIn(formData).unwrap();
      toast.success("sign up success");
      dispatch(setCredentials({ user: data.user, token: data.accessToken }));
      navigate("/candidate", { replace: true });
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-155.5 px-16 bg-background shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Login In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel className="uppercase text-[12px]" htmlFor="email">
                  Email Address
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    className="border-0 border-b-2 rounded-none px-0 py-5 pr-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                    aria-invalid={!!form.formState.errors.email}
                    {...form.register("email")}
                  />

                  <AtSign className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                </div>
                {form.formState.errors.email && (
                  <FieldError errors={[form.formState.errors.email]} />
                )}
              </Field>
              <Field>
                <FieldLabel
                  className="uppercase text-[12px]"
                  htmlFor="password"
                >
                  Password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="password"
                    type={passwordShow ? "text" : "password"}
                    placeholder="••••••••"
                    className="border-0 border-b-2 rounded-none px-0 py-5 pr-10 focus-visible:ring-0 focus-visible:ring-offset-0"
                    aria-invalid={!!form.formState.errors.password}
                    {...form.register("password")}
                  />
                  <div
                    onClick={() => setPasswordShow(!passwordShow)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                  >
                    {passwordShow ? <Eye /> : <EyeClosed />}
                  </div>
                </div>
                {form.formState.errors.password && (
                  <FieldError errors={[form.formState.errors.password]} />
                )}
              </Field>
              <div className=" flex justify-between">
                <div className="flex gap-1.5 items-center">
                  <Checkbox />
                  <span className="text-slate-500 dark:text-slate-400">
                    Remember me
                  </span>
                </div>
                <Link className="text-sm" to={"/forget"}>
                  Forget password?
                </Link>
              </div>
              <Field>
                <Button className="py-6" type="submit">
                  {isLoading ? "Logging..." : "Login"}
                </Button>
                <Button variant="outline" type="button">
                  Login with Google
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="#">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
