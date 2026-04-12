import { Navigate, type RouteObject } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import CandidateLayout from "@/layouts/CandidateLayout";
import CandidateDashboard from "@/pages/Candidate/Dashbaord/CandidateDashboard";
import CandidateProfilePage from "@/pages/Candidate/Profile/CandidateProfile/CandidateProfilePage";
import ProfileEdit from "@/pages/Candidate/Profile/CandidateProfileEdit/ProfileEdit";
import MyCV from "@/pages/Candidate/MyCv/MyCV";
import AppliedJob from "@/pages/Candidate/appliedJob/AppliedJob";
import SaveJob from "@/pages/Candidate/SaveJobsPage/SaveJob";
import FollowCompany from "@/pages/Candidate/FollowCompany";
import JobVisitHistory from "@/pages/Candidate/JobVisitHistory";
import CandidateSettings from "@/pages/Candidate/CandidateSettings";

export const candidateRoutes: RouteObject = {
  path: "/candidate",
  element: (
    <ProtectedRoute allowRole={["CANDIDATE"]}>
      <CandidateLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to={"dashboard"} /> },
    { path: "dashboard", element: <CandidateDashboard /> },
    { path: "profile", element: <CandidateProfilePage /> },
    { path: "profile/edit", element: <ProfileEdit /> },
    { path: "my-cv", element: <MyCV /> },
    { path: "my-applied-jobs", element: <AppliedJob /> },
    { path: "saved-jobs", element: <SaveJob /> },
    { path: "followed-companies", element: <FollowCompany /> },
    { path: "recent-jobs", element: <JobVisitHistory /> },
    { path: "setting", element: <CandidateSettings /> },
  ],
};
