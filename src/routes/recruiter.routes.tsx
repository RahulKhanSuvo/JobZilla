import { Navigate, type RouteObject } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import RecruiterLayout from "@/layouts/RecruiterLayout";
import RecruiterDashboard from "@/pages/Recruiter/RecruiterDashboard";
import MyJobs from "@/pages/Recruiter/myjob/MyJobs";
import PostJob from "@/pages/Recruiter/postjob/PostJob";
import AllApplicants from "@/pages/Recruiter/Applicants/AllApplicants";
import RecruiterProfilePage from "@/pages/Recruiter/Profile/ProfileView/RecruiterProfilePage";
import RecruiterProfileEdit from "@/pages/Recruiter/Profile/EditProfile/RecruiterProfileEdit";
import RecruiterSettings from "@/pages/Recruiter/RecruiterSettings";
import ApplicantDetailPage from "@/pages/Recruiter/applicantDetailPage/ApilicantDetailPage";

export const recruiterRoutes: RouteObject = {
  path: "/recruiter",
  element: (
    <ProtectedRoute allowRole={["EMPLOYER"]}>
      <RecruiterLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to={"dashboard"} /> },
    { path: "dashboard", element: <RecruiterDashboard /> },
    { path: "my-jobs", element: <MyJobs /> },
    { path: "my-jobs/post-job", element: <PostJob /> },
    {
      path: "manage-jobs",
      element: <div className="p-6">Manage Jobs Page</div>,
    },
    { path: "applicants", element: <AllApplicants /> },
    { path: "applicants/:id", element: <ApplicantDetailPage /> },
    { path: "profile", element: <RecruiterProfilePage /> },
    { path: "profile/edit", element: <RecruiterProfileEdit /> },
    { path: "setting", element: <RecruiterSettings /> },
  ],
};
