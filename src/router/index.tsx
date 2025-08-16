import { Navigate, Outlet, useRoutes } from "react-router-dom";
import Lagos from "../pages/Lagos";
import Abuja from "../pages/Abuja";
import Blog from "../pages/Blog";
import ErrorPage from "../pages/ErrorPage";
import RecognizeABusinessPage from "../pages/nominationPage/index";
import ContactUsPage from "../pages/contactPage/index";
import GrantPage from "../pages/grantPage/index";
import BookingPage from "../pages/bookingPage/index";
import BoothRegisterationPage from "../pages/boothRegistration";
import LagosPage from "../pages/LagosPage";
import AbujaPage from "../pages/AbujaPage/index";
import LandingPage from "../pages/landingPage";

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
        {
          path: "/recognize-a-business",
          element: <RecognizeABusinessPage />,
        },
        {
          path: "/contact-us",
          element: <ContactUsPage />,
        },
        {
          path: "/grant",
          element: <GrantPage />,
        },
        {
          path: "/booking",
          element: <BookingPage />,
        },
        {
          path: "/booth-registration",
          element: <BoothRegisterationPage />,
        },
        {
          path: "/booking",
          element: <BookingPage />,
        },
        {
          path: "/conference-lagos",
          element: <LagosPage />,
        },
        {
          path: "/conference-abuja",
          element: <AbujaPage />,
        },
        {
          path: "/our-blog",
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

function PublicLayout() {
  return <Outlet />;
}
