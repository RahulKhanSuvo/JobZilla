import { LoginForm } from "@/components/login-form";
import LoginInfo from "./LoginInfo";

export default function Login() {
  return (
    <div className="flex  h-screen justify-between ">
      <LoginInfo />
      <LoginForm className="w-fit  flex justify-center  shadow-none items-center" />
    </div>
  );
}
