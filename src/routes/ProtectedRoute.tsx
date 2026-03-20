import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
type ProtectedRouteProps = {
  children: ReactNode;
  allowRole: string[];
};
export default function ProtectedRoute({
  children,
  allowRole = [],
}: ProtectedRouteProps) {
  const user = useSelector(selectCurrentUser);
  console.log("route", user);
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  if (!allowRole.includes(user.role)) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}
