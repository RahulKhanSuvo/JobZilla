import GlobalErrorBoundary from "@/pages/errors/GlobalErrorBoundary";
import { createBrowserRouter } from "react-router";
import { mainRoutes } from "./main.routes";
import { authRoutes } from "./auth.routes";
import { candidateRoutes } from "./candidate.routes";
import { recruiterRoutes } from "./recruiter.routes";
import { adminRoutes } from "./admin.routes";
import Error from "@/pages/errors/Error";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <GlobalErrorBoundary />,
    children: [
      mainRoutes,
      authRoutes,
      candidateRoutes,
      recruiterRoutes,
      adminRoutes,
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
