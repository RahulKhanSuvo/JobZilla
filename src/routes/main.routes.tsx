import { lazy, Suspense } from "react";
import MainLayout from "@/layouts/MainLayout";
import { type RouteObject } from "react-router";
import GlobalErrorBoundary from "@/pages/errors/GlobalErrorBoundary";
import JobzillaLoading from "@/components/common/JobzillaLoading";

const Home = lazy(() => import("@/pages/Home/Home"));
const FindJob = lazy(() => import("@/pages/FindJob/FindJob"));
const About = lazy(() => import("@/pages/About/About"));
const Contact = lazy(() => import("@/pages/Contact/Contact"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy/PrivacyPolicy"));
const TermsOfService = lazy(
  () => import("@/pages/TermsOfService/TermsOfService"),
);
const JobDetails = lazy(() => import("@/pages/JobDetails/JobDetails"));
const Pricing = lazy(() => import("@/pages/Pricing/Pricing"));
const Login = lazy(() => import("@/pages/auth/Login"));
const SignUp = lazy(() => import("@/pages/auth/SignUp"));

export const mainRoutes: RouteObject = {
  path: "/",
  errorElement: <GlobalErrorBoundary />,
  element: (
    <Suspense fallback={<JobzillaLoading />}>
      <MainLayout />
    </Suspense>
  ),
  children: [
    { path: "/", element: <Home /> },
    { path: "/find-job", element: <FindJob /> },
    { path: "/job/:id", element: <JobDetails /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/terms", element: <TermsOfService /> },
    { path: "/contact", element: <Contact /> },
    { path: "/about", element: <About /> },
    { path: "/pricing", element: <Pricing /> },
    { path: "/auth/login", element: <Login /> },
    { path: "/auth/sign-up", element: <SignUp /> },
  ],
};
