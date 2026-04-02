import {
  selectCurrentUser,
  selectLoading,
} from "@/redux/features/auth/authSlice";
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
  const loading = useSelector(selectLoading);
  console.log(user);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user) {
    return <Navigate to={"/auth/login"} replace />;
  }
  if (!allowRole.includes(user.role)) {
    return <Navigate to={"/auth/login"} replace />;
  }
  return children;
}
