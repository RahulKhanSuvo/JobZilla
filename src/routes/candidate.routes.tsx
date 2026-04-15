import CandidateLayout from "@/layouts/CandidateLayout";
import { Navigate, type RouteObject } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import { lazy, Suspense } from "react";
import JobzillaLoading from "@/components/common/JobzillaLoading";
const CandidateDashboard = lazy(
  () => import("@/pages/Candidate/Dashbaord/CandidateDashboard"),
);
const CandidateProfilePage = lazy(
  () =>
    import("@/pages/Candidate/Profile/CandidateProfile/CandidateProfilePage"),
);
const ProfileEdit = lazy(
  () => import("@/pages/Candidate/Profile/CandidateProfileEdit/ProfileEdit"),
);
const MyCV = lazy(() => import("@/pages/Candidate/MyCv/MyCV"));
const AppliedJob = lazy(
  () => import("@/pages/Candidate/appliedJob/AppliedJob"),
);
const SaveJob = lazy(() => import("@/pages/Candidate/SaveJobsPage/SaveJob"));
const FollowCompany = lazy(
  () => import("@/pages/Candidate/FollowCompany/FollowCompany"),
);
const JobVisitHistory = lazy(() => import("@/pages/Candidate/JobVisitHistory"));
const CandidateSettings = lazy(
  () => import("@/pages/Candidate/settings/CandidateSettings"),
);
const Message = lazy(() => import("@/pages/Candidate/message/Message"));
const Notification = lazy(
  () => import("@/pages/Candidate/Notification/Notification"),
);
export const candidateRoutes: RouteObject = {
  path: "/candidate",
  element: (
    <ProtectedRoute allowRole={["CANDIDATE"]}>
      <Suspense fallback={<JobzillaLoading />}>
        <CandidateLayout />
      </Suspense>
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to={"dashboard"} /> },
    { path: "dashboard", element: <CandidateDashboard /> },
    {
      path: "profile",
      children: [
        { index: true, element: <CandidateProfilePage /> },
        { path: "edit", element: <ProfileEdit /> },
      ],
    },
    { path: "my-cv", element: <MyCV /> },
    { path: "my-applied-jobs", element: <AppliedJob /> },
    { path: "saved-jobs", element: <SaveJob /> },
    { path: "followed-companies", element: <FollowCompany /> },
    {
      path: "followed-companies/:id",
      element: <FollowCompany />,
    },
    {
      path: "messages",
      element: <Message />,
    },
    {
      path: "messages/:id",
      element: <Message />,
    },
    {
      path: "notifications",
      element: <Notification />,
    },
    { path: "recent-jobs", element: <JobVisitHistory /> },
    { path: "settings", element: <CandidateSettings /> },
  ],
};
