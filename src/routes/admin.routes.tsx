import AdminLayout from "@/layouts/AdminLayout";
import AdminDashbaord from "@/pages/Admin/Dashboard/AdminDashbaord";
import type { RouteObject } from "react-router";

export const adminRoute: RouteObject = {
  path: "/admin",
  element: <AdminLayout />,
  children: [{ path: "/dashbard", element: <AdminDashbaord /> }],
};
