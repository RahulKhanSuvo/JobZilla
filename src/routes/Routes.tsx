import Error from "@/pages/Error";
import { createBrowserRouter } from "react-router";
import { mainRoutes } from "./main.routes";
import { authRoutes } from "./auth.routes";
import { candidateRoutes } from "./candidate.routes";
import { recruiterRoutes } from "./recruiter.routes";

const router = createBrowserRouter([
  mainRoutes,
  authRoutes,
  candidateRoutes,
  recruiterRoutes,
  {
    path: "*",
    element: <Error />,
  },
]);

export default router;
