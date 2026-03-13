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
import RecruiterLayout from "@/layouts/RecruiterLayout";
import RecruiterDashboard from "@/pages/Recruiter/RecruiterDashboard";
import RecruiterProfilePage from "@/pages/Recruiter/Profile/RecruiterProfilePage";
import RecruiterSettings from "@/pages/Recruiter/RecruiterSettings";
import MyJobs from "@/pages/Recruiter/MyJobs";
import ProfileEdit from "@/pages/Candidate/Profile/ProfileEdit";
import MyCV from "@/pages/Candidate/MyCv/MyCV";
import RecruiterProfileEdit from "@/pages/Recruiter/Profile/RecruiterProfileEdit";
import PostJob from "@/pages/Recruiter/Profile/PostJob";
import AllApplicants from "@/pages/Recruiter/Applicants/AllApplicants";
import FindJob from "@/pages/FindJob/FindJob";
import About from "@/pages/About/About";
import Contact from "@/pages/Contact/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy/PrivacyPolicy";
import JobDetails from "@/pages/JobDetails/JobDetails";
import Pricing from "@/pages/Pricing/Pricing";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/find-job",
        element: <FindJob />,
      },
      {
        path: "/job/:id",
        element: <JobDetails />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/pricing",
        element: <Pricing />,
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
        element: <SignUp />,
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
        path: "profile/edit",
        element: <ProfileEdit />,
      },
      {
        path: "my-cv",
        element: <MyCV />,
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
  // recruiter
  {
    path: "/recruiter",
    element: (
      // <ProtectedRoute allowRole={["USER"]}>
      <RecruiterLayout />
      // </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={"dashboard"} />,
      },
      {
        path: "dashboard",
        element: <RecruiterDashboard />,
      },
      {
        path: "my-jobs",
        element: <MyJobs />,
      },
      {
        path: "my-jobs/post-job",
        element: <PostJob />,
      },
      {
        path: "manage-jobs",
        element: <div className="p-6">Manage Jobs Page</div>,
      },
      {
        path: "applicants",
        element: <AllApplicants />,
      },
      {
        path: "profile",
        element: <RecruiterProfilePage />,
      },
      {
        path: "profile/edit",
        element: <RecruiterProfileEdit />,
      },
      {
        path: "setting",
        element: <RecruiterSettings />,
      },
    ],
  },
]);
export default router;
