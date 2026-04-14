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

export const adminRoutes: RouteObject = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { path: "dashboard", element: <AdminDashboard /> },
    { path: "users", element: <AdminAllUserPage /> },
    { path: "jobs", element: <JobManagePage /> },
    { path: "companies", element: <AdminCompanyPage /> },
    { path: "payments", element: <AdminPaymentPage /> },
    { path: "messages", element: <Message /> },
    { path: "messages/:id", element: <Message /> },
    { path: "notifications", element: <Notification /> },
    { path: "settings", element: <AdminSettingPage /> },
  ],
};
