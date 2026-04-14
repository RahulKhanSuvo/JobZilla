import AdminLayout from "@/layouts/AdminLayout";
import AdminDashboard from "@/pages/Admin/Dashboard/AdminDashboard";
import AdminAllUserPage from "@/pages/Admin/Users/AdminAllUserPage";
import AdminCompanyPage from "@/pages/Admin/company/AdminCompanyPage";
import JobManagePage from "@/pages/Admin/JobManager/JobManagePage";
import AdminPaymentPage from "@/pages/Admin/Payments/AdminPaymentPage";
import AdminSettingPage from "@/pages/Admin/setting/AdminSettingPage";
import Message from "@/pages/Candidate/message/Message";
import Notification from "@/pages/Candidate/Notification/Notification";
import type { RouteObject } from "react-router";
import ActivitiesPage from "@/pages/Admin/Activities/ActivitiesPage";
import PlansPage from "@/pages/Admin/plans/PlantsPage";
import ProtectedRoute from "./ProtectedRoute";

export const adminRoutes: RouteObject = {
  path: "/admin",
  element: (
    <ProtectedRoute allowRole={["ADMIN"]}>
      <AdminLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: "dashboard", element: <AdminDashboard /> },
    { path: "users", element: <AdminAllUserPage /> },
    { path: "jobs", element: <JobManagePage /> },
    { path: "companies", element: <AdminCompanyPage /> },
    { path: "payments", element: <AdminPaymentPage /> },
    { path: "messages", element: <Message /> },
    { path: "messages/:id", element: <Message /> },
    { path: "notifications", element: <Notification /> },
    { path: "activities", element: <ActivitiesPage /> },
    { path: "payments", element: <AdminPaymentPage /> },
    { path: "plans", element: <PlansPage /> },
    { path: "settings", element: <AdminSettingPage /> },
  ],
};
