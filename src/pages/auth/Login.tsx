import { LoginForm } from "@/components/login-form";

export default function Login() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-white dark:bg-slate-950">
      <div className="w-full max-w-[500px] flex flex-col items-center">
        <LoginForm className="w-full" />
      </div>
    </div>
  );
}
