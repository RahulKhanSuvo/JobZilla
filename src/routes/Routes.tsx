import CandidateLayout from "@/layouts/CandidateLayout";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import Error from "@/pages/Error";
import Home from "@/pages/Home/Home";
import { createBrowserRouter, Navigate, Outlet } from "react-router";
// import ProtectedRoute from "./ProtectedRoute";
import CandidateDashboard from "@/pages/Candidate/CandidateDashboard";
import CandidateProfilePage from "@/pages/Candidate/Profile/CandidateProfilePage";
import AppliedJob from "@/pages/Candidate/AppliedJob";
import SaveJob from "@/pages/Candidate/SaveJob";
// import ProfileView from "@/pages/Candidate/ProfileView";
import FollowCompany from "@/pages/Candidate/FollowCompany";
import JobVisitHistory from "@/pages/Candidate/JobVisitHistory";
import CandidateSettings from "@/pages/Candidate/CandidateSettings";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  // auth layout
  {
    path: "/auth",
    element: <Outlet />,
    children: [
      {
        index: true,
        element: <Navigate to={"login"} replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "sign-up",
        element: <Outlet />,
        children: [
          {
            index: true,
            element: <SignUp />,
          },
          {},
        ],
      },
    ],
  },
  // candidate layout
  {
    path: "/candidate",
    element: (
      // <ProtectedRoute allowRole={["USER"]}>
      <CandidateLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={"dashboard"} />,
      },
      {
        path: "dashboard",
        element: <CandidateDashboard />,
      },
      {
        path: "profile",
        element: <CandidateProfilePage />,
      },
      {
        path: "applied-job",
        element: <AppliedJob />,
      },
      {
        path: "save-job",
        element: <SaveJob />,
      },
      // {
      //   path: "profile-views",
      //   element: <ProfileView />,
      // },
      {
        path: "followed-companies",
        element: <FollowCompany />,
      },
      {
        path: "recent-jobs",
        element: <JobVisitHistory />,
      },
      {
        path: "setting",
        element: <CandidateSettings />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);
export default router;
