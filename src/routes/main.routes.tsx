import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home/Home";
import FindJob from "@/pages/FindJob/FindJob";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy/PrivacyPolicy";
import JobDetails from "@/pages/JobDetails/JobDetails";
import Pricing from "@/pages/Pricing/Pricing";
import { type RouteObject } from "react-router";

export const mainRoutes: RouteObject = {
  path: "/",
  element: <MainLayout />,
  children: [
    { path: "/", element: <Home /> },
    { path: "/find-job", element: <FindJob /> },
    { path: "/job/:id", element: <JobDetails /> },
    { path: "/privacy-policy", element: <PrivacyPolicy /> },
    { path: "/contact", element: <Contact /> },
    { path: "/about", element: <About /> },
    { path: "/pricing", element: <Pricing /> },
  ],
};
