import { Navigate, Outlet, useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
// import DashboardOverview1 from "../pages/DashboardOverview1";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import UpdateProfile from "../pages/UpdateProfile";
import ChangePassword from "../pages/ChangePassword";
import { ProtectedRoute } from "../pages/Public/router";
import { ProtectedRouter } from "../pages/Protected/router";
import ForgetPassword from "../pages/ForgotPassword";
import VerifyOtp from "../pages/VerifyOtp";
import ResetPassword from "../pages/ResetPassword";
import HeroSection from "../pages/HeroSection";
import HeroForm from "../pages/HeroForm";
import AboutUs from "../pages/AboutUs";
import AboutForm from "../pages/AboutForm";
import Histories from "../pages/Histories";
import HistoriesForm from "../pages/HistoriesForm";
import BoardMembers from "../pages/BoardMember";
import BoardMemberCategories from "../pages/BoardMemberCategories";
import BoardMembersForm from "../pages/BoardMemberForm";
import BoardMemberCategoriesForm from "../pages/BoardCategoriesForm";
import OurPartner from "../pages/OurPartner";
import OurPartnerForm from "../pages/OurPartnerForm";
import NewsForm from "../pages/NewsForm";
import News from "../pages/News";
import NewsCategory from "../pages/NewsCategories";
import NewsCategoryForm from "../pages/NewsCategoriesForm";
import Testimony from "../pages/Testimony";
import TestimonyForm from "../pages/TestimonyForm";
import Event from "../pages/Event";
import EventForm from "../pages/EventForm";
import EventTypeForm from "../pages/EventTypeForm";
import EventType from "../pages/EventType";
import CreateContactForm from "../pages/CreateContactForm";
import ContactForm from "../pages/ContactForm";
import ContactDetails from "../pages/ContactDetails";
import ContactDetailsForm from "../pages/ContactDetailsForm";
import Newsletter from "../pages/Newsletter";
import NewsletterForm from "../pages/NewsletterForm";
import SocialMedia from "../pages/SocialMedia";
import SocialMediaForm from "../pages/SocialMediaForm";
import FAQ from "../pages/FAQ";
import FAQForm from "../pages/FAQForm";
import PositionCategory from "../pages/PositionCategory";
import PositionCategoryForm from "../pages/PositionCategoryForm";
import Position from "../pages/Position";
import PositionForm from "../pages/PositionForm";
import Programmes from "../pages/Programmes";
import ProgrammesForm from "../pages/ProgrammesForm";
import Courses from "../pages/Courses";
import CoursesForm from "../pages/CoursesForm";
import Staff from "../pages/Staff";
import StaffForm from "../pages/StaffForm";
import PublicationCategoryMain from "../pages/PublicationCategory";
import PublicationCategoryForm from "../pages/PublicationCategoryForm";
import PublicationMain from "../pages/Publication";
import PublicationForm from "../pages/PublicationForm";
import SpecialEnquiryMain from "../pages/SpecialEnquiries";
import SpecialEnquiryForm from "../pages/SpecialEnquiriesForm";
import AdmissionDetailsMain from "../pages/AdmissionDetails";
import AdmissionDetailsForm from "../pages/AdmissionDetailsForm";
import AdmissionFaqForm from "../pages/AdmissionFaqForm";
import AdmissionFaqs from "../pages/AdmissionFaqs";
import Partnership from "../pages/Partnership";
import PartnershipForm from "../pages/PartnershipForm";
import CollaborationMain from "../pages/Collaborations";
import CollaborationForm from "../pages/CollaborationsForm";
import Login from "../pages/Public/Login";
import ProfilePreview from "../pages/UpdateProfile/index";
import RecognizeABusinessPage from "../pages/nominationPage/index";
import ContactUsPage from "../pages/contactPage/index";
import GrantPage from "../pages/grantPage/index";
import BookingPage from "../pages/bookingPage/index";
import BoothRegisterationPage from "../pages/boothRegistration";
import LagosPage from "../pages/LagosPage";
import AbujaPage from "../pages/AbujaPage/index";
import LandingPage from "../pages/LandingPage/Landingpage";
import Blog from "../pages/Blog";
import Support from "../pages/Support";

function Router() {
  const routes = [
    {
      path: "/",
      element: <PublicLayout />,
      children: [
        {
          index: true,
          element: <LandingPage />,
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
          path: "/lagos",
          element: <LagosPage />,
        },
        {
          path: "/abuja",
          element: <AbujaPage />,
        },
        {
          path: "/our-blog",
          element: <Blog />,
        },
        {
          path: "/donate",
          element: <Support />,
        },
      ],
    },
    // {
    //   path: "/auth",
    //   element: <PublicLayout />,
    //   children: [
    //     {
    //       index: true,
    //       element: <Navigate to="/auth/login" replace />,
    //     },
    //     {
    //       path: "/auth/login",
    //       element: <Login />,
    //     },
    //     {
    //       path: "/auth/register",
    //       element: <Register />,
    //     },
    //     {
    //       path: "/auth/forget-password",
    //       element: <ForgetPassword />,
    //     },
    //     {
    //       path: "/auth/verify-otp",
    //       element: <VerifyOtp />,
    //     },
    //     {
    //       path: "/auth/reset-password",
    //       element: <ResetPassword />,
    //     },
    //     {
    //       path: "auth/change-password",
    //       element: <ChangePassword />,
    //     },
    //   ],
    // },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <SideMenu />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/hero-section",
          element: <HeroSection />,
        },
        {
          path: "/partnership",
          element: <Partnership />,
        },
        {
          path: "/collaborations",
          element: <CollaborationMain />,
        },
        {
          path: "/create-collaboration",
          element: <CollaborationForm />,
        },
        {
          path: "/create-partnership",
          element: <PartnershipForm />,
        },
        {
          path: "/admission-details",
          element: <AdmissionDetailsMain />,
        },
        {
          path: "/create-admission-detail",
          element: <AdmissionDetailsForm />,
        },
        {
          path: "/create-admission-faq",
          element: <AdmissionFaqForm />,
        },
        {
          path: "/admission-faq",
          element: <AdmissionFaqs />,
        },
        {
          path: "/special-enquiry",
          element: <SpecialEnquiryMain />,
        },
        {
          path: "/create-special-enquiry",
          element: <SpecialEnquiryForm />,
        },
        {
          path: "/event",
          element: <Event />,
        },
        {
          path: "/create-course",
          element: <CoursesForm />,
        },
        {
          path: "/courses",
          element: <Courses />,
        },
        {
          path: "/create-staffs",
          element: <StaffForm />,
        },
        {
          path: "/staff",
          element: <Staff />,
        },
        {
          path: "/create-publication-category",
          element: <PublicationCategoryForm />,
        },
        {
          path: "/publication-category",
          element: <PublicationCategoryMain />,
        },
        {
          path: "/publication",
          element: <PublicationMain />,
        },
        {
          path: "/create-publication",
          element: <PublicationForm />,
        },
        {
          path: "/social-media",
          element: <SocialMedia />,
        },
        {
          path: "/create-social-medias",
          element: <SocialMediaForm />,
        },
        {
          path: "/contact-form",
          element: <ContactForm />,
        },
        {
          path: "/faq",
          element: <FAQ />,
        },
        {
          path: "/create-faq",
          element: <FAQForm />,
        },
        {
          path: "/create-contact-details",
          element: <ContactDetailsForm />,
        },
        {
          path: "/contact-details",
          element: <ContactDetails />,
        },
        {
          path: "/programmes",
          element: <Programmes />,
        },
        {
          path: "/create-programmes",
          element: <ProgrammesForm />,
        },
        {
          path: "/create-contact-form",
          element: <CreateContactForm />,
        },
        {
          path: "/create-event",
          element: <EventForm />,
        },
        {
          path: "/create-event-type",
          element: <EventTypeForm />,
        },
        {
          path: "/newsletter",
          element: <Newsletter />,
        },
        {
          path: "/position-category",
          element: <PositionCategory />,
        },
        {
          path: "/create-position-category",
          element: <PositionCategoryForm />,
        },
        {
          path: "/create-positions",
          element: <PositionForm />,
        },
        {
          path: "/position",
          element: <Position />,
        },
        {
          path: "/create-newsletter",
          element: <NewsletterForm />,
        },
        {
          path: "/event-type",
          element: <EventType />,
        },
        {
          path: "/create-hero",
          element: <HeroForm />,
        },
        {
          path: "/about-us",
          element: <AboutUs />,
        },
        {
          path: "/create-about",
          element: <AboutForm />,
        },
        {
          path: "/histories",
          element: <Histories />,
        },
        {
          path: "/create-history",
          element: <HistoriesForm />,
        },
        {
          path: "board-members",
          element: <BoardMembers />,
        },
        {
          path: "our-partner",
          element: <OurPartner />,
        },
        {
          path: "create-our-partner",
          element: <OurPartnerForm />,
        },
        {
          path: "create-board-member",
          element: <BoardMembersForm />,
        },
        {
          path: "create-news",
          element: <NewsForm />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "news-categories",
          element: <NewsCategory />,
        },
        {
          path: "testimony",
          element: <Testimony />,
        },
        {
          path: "create-testimony",
          element: <TestimonyForm />,
        },
        {
          path: "create-news-category",
          element: <NewsCategoryForm />,
        },
        {
          path: "profile-preview",
          element: <ProfilePreview />,
        },
        {
          path: "board-member-categories",
          element: <BoardMemberCategories />,
        },
        {
          path: "create-board-member-categories",
          element: <BoardMemberCategoriesForm />,
        },
        {
          path: "update-profile",
          element: <UpdateProfile />,
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
