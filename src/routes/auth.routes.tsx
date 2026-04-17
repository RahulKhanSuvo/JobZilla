import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import { Navigate, Outlet, type RouteObject } from "react-router";
import GlobalErrorBoundary from "@/pages/errors/GlobalErrorBoundary";

export const authRoutes: RouteObject = {
  path: "/auth",
  errorElement: <GlobalErrorBoundary />,
  element: <Outlet />,
  children: [
    { index: true, element: <Navigate to={"login"} replace /> },
    { path: "login", element: <Login /> },
    { path: "sign-up", element: <SignUp /> },
  ],
};
