import { Navigate, Outlet, useRoutes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import LandingPage from "../pages/LandingPage";
import Lagos from "../pages/Lagos";
import Abuja from "../pages/Abuja";
import Blog from "../pages/Blog";
import ErrorPage from "../pages/ErrorPage";

function Router() {
  const routes = [
    // Public routes with navigation and footer
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <LandingPage />,
        },
        {
          path: "/lagos",
          element: <Lagos />,
        },
        {
          path: "/abuja",
          element: <Abuja />,
        },
        {
          path: "/blog",
          element: <Blog />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/error-page" replace />,
    },
    {
      path: "/error-page",
      element: <ErrorPage />,
    },
  ];

  return useRoutes(routes);
}

export default Router;