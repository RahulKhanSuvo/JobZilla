import { Navigate, type RouteObject } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import RecruiterLayout from "@/layouts/RecruiterLayout";
import RecruiterDashboard from "@/pages/Recruiter/Dashboard/RecruiterDashboard";
import MyJobs from "@/pages/Recruiter/myjob/MyJobs";
import PostJob from "@/pages/Recruiter/postjob/PostJob";
import EditJob from "@/pages/Recruiter/postjob/EditJob";
import AllApplicants from "@/pages/Recruiter/Applicants/AllApplicants";
import RecruiterProfilePage from "@/pages/Recruiter/Profile/ProfileView/RecruiterProfilePage";
import RecruiterProfileEdit from "@/pages/Recruiter/Profile/EditProfile/RecruiterProfileEdit";
import RecruiterSettings from "@/pages/Recruiter/setting/RecruiterSettings";
import ApplicantDetailPage from "@/pages/Recruiter/applicantDetailPage/ApilicantDetailPage";
import Message from "@/pages/Candidate/message/Message";
import Notification from "@/pages/Candidate/Notification/Notification";
import RectutierPlansPage from "@/pages/Recruiter/plans/RectutierPlansPage";

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
    { path: "my-jobs/edit-job/:id", element: <EditJob /> },
    {
      path: "plans",
      element: <RectutierPlansPage />,
    },
    { path: "applicants", element: <AllApplicants /> },
    { path: "applicants/:id", element: <ApplicantDetailPage /> },
    { path: "profile", element: <RecruiterProfilePage /> },
    { path: "messages", element: <Message /> },
    { path: "messages/:id", element: <Message /> },
    { path: "notifications", element: <Notification /> },
    { path: "profile/edit", element: <RecruiterProfileEdit /> },
    { path: "setting", element: <RecruiterSettings /> },
  ],
};
