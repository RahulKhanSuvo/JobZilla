import { lazy, Suspense } from "react";
import { Navigate, type RouteObject } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
import JobzillaLoading from "@/components/common/JobzillaLoading";
const AdminLayout = lazy(() => import("@/layouts/AdminLayout"));
const AdminDashboard = lazy(
  () => import("@/pages/Admin/Dashboard/AdminDashboard"),
);
const AdminAllUserPage = lazy(
  () => import("@/pages/Admin/Users/AdminAllUserPage"),
);
const AdminCompanyPage = lazy(
  () => import("@/pages/Admin/company/AdminCompanyPage"),
);
const JobManagePage = lazy(
  () => import("@/pages/Admin/JobManager/JobManagePage"),
);
const AdminPaymentPage = lazy(
  () => import("@/pages/Admin/Payments/AdminPaymentPage"),
);
const AdminSettingPage = lazy(
  () => import("@/pages/Admin/setting/AdminSettingPage"),
);
const Notification = lazy(
  () => import("@/pages/Candidate/Notification/Notification"),
);
const ActivitiesPage = lazy(
  () => import("@/pages/Admin/Activities/ActivitiesPage"),
);
const PlansPage = lazy(() => import("@/pages/Admin/plans/PlantsPage"));

export const adminRoutes: RouteObject = {
  path: "/admin",
  element: (
    <ProtectedRoute allowRole={["ADMIN"]}>
      <Suspense fallback={<JobzillaLoading />}>
        <AdminLayout />
      </Suspense>
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <Navigate to={"dashboard"} /> },
    { path: "dashboard", element: <AdminDashboard /> },
    { path: "users", element: <AdminAllUserPage /> },
    { path: "jobs", element: <JobManagePage /> },
    { path: "companies", element: <AdminCompanyPage /> },
    { path: "payments", element: <AdminPaymentPage /> },
    { path: "notifications", element: <Notification /> },
    { path: "activities", element: <ActivitiesPage /> },
    { path: "plans", element: <PlansPage /> },
    { path: "settings", element: <AdminSettingPage /> },
  ],
};
