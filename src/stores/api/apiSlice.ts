import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import TokenService from "../../services";
import { config } from "../../config";
import {
  About,
  AdmissionDetails,
  AdmissionFaq,
  BoardMemberCategory,
  BoardMemberType,
  CareerVolunteer,
  Collaborations,
  ContactDetails,
  ContactForm,
  Courses,
  Event,
  EventTypes,
  FAQ,
  GetNewsCategoryResponse,
  Hero,
  Histories,
  NewsCategory,
  NewsData,
  NewsItem,
  NewsLetter,
  Partners,
  Partnership,
  Position,
  Programmes,
  Publication,
  PublicationCategories,
  SocialMedia,
  SpecialEnquiry,
  Staff,
  StaffResponse,
  Stats,
  Testimonies,
} from "../../utils/dataTypes";

const { baseUrl } = config;
const apiLink = import.meta.env.MODE === "production" ? baseUrl : baseUrl;

const userToken = TokenService.getLocalAccessToken();

export const crudApi = createApi({
  reducerPath: "crudApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiLink,
    prepareHeaders: (headers: HeadersInit) => {
      const token = userToken;

      const updatedHeaders = new Headers(headers);

      if (token) {
        updatedHeaders.set("Authorization", `Bearer ${token}`);
      }

      return updatedHeaders;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: { ...data },
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: { ...data },
      }),
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/forgotten-password",
        method: "POST",
        body: { ...data },
      }),
    }),
    verifyPassword: builder.mutation({
      query: (data) => ({
        url: "/verify-password-otp",
        method: "POST",
        body: { ...data },
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/reset-password",
        method: "POST",
        body: { ...data },
      }),
    }),
    getHeroSection: builder.query<Hero, number>({
      query: (page = 1) => ({
        url: `/hero-sections?page=${page}`,
      }),
      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleHeroSection: builder.query<Hero, string>({
      query: (id) => ({
        url: `/hero-sections/${id}`,
      }),
    }),
    createHero: builder.mutation({
      query: (data) => ({
        url: "/hero-sections",
        method: "POST",
        body: data,
      }),
    }),
    updateHero: builder.mutation({
      query: ({ id, data }) => ({
        url: `/hero-sections/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteHero: builder.mutation({
      query: (id) => ({
        url: `/hero-sections/${id}`,
        method: "DELETE",
      }),
    }),
    getAbout: builder.query<About, number>({
      query: (page = 1) => ({
        url: `/about-us?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleAbout: builder.query<About, string>({
      query: (id) => ({
        url: `/about-us/${id}`,
      }),
    }),
    createAbout: builder.mutation({
      query: (data) => ({
        url: "/about-us",
        method: "POST",
        body: data,
      }),
    }),
    updateAbout: builder.mutation({
      query: ({ id, data }) => ({
        url: `/about-us/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteAbout: builder.mutation({
      query: (id) => ({
        url: `/about-us/${id}`,
        method: "DELETE",
      }),
    }),
    getHistories: builder.query<Histories, number>({
      query: (page = 1) => ({
        url: `/histories?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleHistory: builder.query<Histories, string>({
      query: (id) => ({
        url: `/histories/${id}`,
      }),
    }),
    createHistory: builder.mutation({
      query: (data) => ({
        url: "/histories",
        method: "POST",
        body: data,
      }),
    }),
    updateHistory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/histories/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteHistory: builder.mutation({
      query: (id) => ({
        url: `/histories/${id}`,
        method: "DELETE",
      }),
    }),
    getBoardMembers: builder.query<BoardMemberCategory, number>({
      query: (page = 1) => ({
        url: `/board-members-categories?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleBoardMembers: builder.query<BoardMemberCategory, string>({
      query: (id) => ({
        url: `/board-members-categories/${id}`,
      }),
    }),
    createBoardMembers: builder.mutation({
      query: (data) => ({
        url: "/board-members-categories",
        method: "POST",
        body: data,
      }),
    }),
    updateBoardMembers: builder.mutation({
      query: ({ id, data }) => ({
        url: `/board-members-categories/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBoardMembers: builder.mutation({
      query: (id) => ({
        url: `/board-members-categories/${id}`,
        method: "DELETE",
      }),
    }),
    getBoardMember: builder.query<BoardMemberType, number>({
      query: (page = 1) => ({
        url: `/board-members?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleBoardMember: builder.query<BoardMemberType, string>({
      query: (id) => ({
        url: `/board-members/${id}`,
      }),
    }),
    createBoardMember: builder.mutation({
      query: (data) => ({
        url: "/board-members",
        method: "POST",
        body: data,
      }),
    }),
    updateBoardMember: builder.mutation({
      query: ({ id, data }) => ({
        url: `/board-members/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBoardMember: builder.mutation({
      query: (id) => ({
        url: `/board-members/${id}`,
        method: "DELETE",
      }),
    }),
    getPartners: builder.query<Partners, number>({
      query: (page = 1) => ({
        url: `/our-partners?page=${page}`,
      }),
      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSinglePartners: builder.query<Partners, string>({
      query: (id) => ({
        url: `/our-partners/${id}`,
      }),
    }),
    createPartners: builder.mutation({
      query: (data) => ({
        url: "/our-partners",
        method: "POST",
        body: data,
      }),
    }),
    updatePartners: builder.mutation({
      query: ({ id, data }) => ({
        url: `/our-partners/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deletePartners: builder.mutation({
      query: (id) => ({
        url: `/our-partners/${id}`,
        method: "DELETE",
      }),
    }),
    getNewsCategory: builder.query<NewsCategory, number>({
      query: (page = 1) => ({
        url: `/news-categories?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleNewsCategory: builder.query<GetNewsCategoryResponse, string>({
      query: (id) => ({
        url: `/news-categories/${id}`,
      }),
    }),
    createNewsCategory: builder.mutation({
      query: (data) => ({
        url: "/news-categories",
        method: "POST",
        body: { ...data },
      }),
    }),
    updateNewsCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/news-categories/${id}`,
        method: "PATCH",
        body: { ...data },
      }),
    }),
    deleteNewsCategory: builder.mutation({
      query: (id) => ({
        url: `/news-categories/${id}`,
        method: "DELETE",
      }),
    }),
    getNews: builder.query<NewsData, number>({
      query: (page = 1) => ({
        url: `/news?$page={page}`,
      }),
      transformResponse: (response: any) => (
        console.log("API Response:", response),
        {
          data: response.data?.data || response.data || [],
          totalItems: response.data.meta?.total || response.total || 0,
          totalPages:
            response.data.meta?.totalPage ||
            Math.ceil(
              (response.data?.total ||
                response.data.meta?.total ||
                response.total ||
                0) / (response.data?.per_page || response.meta?.per_page || 10)
            ),
        }
      ),
    }),
    getSingleNews: builder.query<NewsItem, string>({
      query: (id) => ({
        url: `/news/${id}`,
      }),
    }),
    createNews: builder.mutation({
      query: (data) => ({
        url: "/news",
        method: "POST",
        body: data,
      }),
    }),
    updateNews: builder.mutation({
      query: ({ id, data }) => ({
        url: `/news/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/news/${id}`,
        method: "DELETE",
      }),
    }),
    getTestimonies: builder.query<Testimonies, number>({
      query: (page = 1) => ({
        url: `/testimonies?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleTestimonies: builder.query<Testimonies, string>({
      query: (id) => ({
        url: `/testimonies/${id}`,
      }),
    }),
    createTestimonies: builder.mutation({
      query: (data) => ({
        url: "/testimonies",
        method: "POST",
        body: data,
      }),
    }),
    updateTestimonies: builder.mutation({
      query: ({ id, data }) => ({
        url: `/testimonies/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteTestimonies: builder.mutation({
      query: (id) => ({
        url: `/testimonies/${id}`,
        method: "DELETE",
      }),
    }),
    getEventTypes: builder.query<EventTypes, number>({
      query: (page = 1) => ({
        url: `/event-types?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleEventTypes: builder.query<EventTypes, string>({
      query: (id) => ({
        url: `/event-types/${id}`,
      }),
    }),
    createEventTypes: builder.mutation({
      query: (data) => ({
        url: "/event-types",
        method: "POST",
        body: data,
      }),
    }),
    updateEventTypes: builder.mutation({
      query: ({ id, data }) => ({
        url: `/event-types/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteEventTypes: builder.mutation({
      query: (id) => ({
        url: `/event-types/${id}`,
        method: "DELETE",
      }),
    }),
    getEvents: builder.query<Event, number>({
      query: (page = 1) => ({
        url: `/events?page=${page}`,
      }),
      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleEvents: builder.query<Event, string>({
      query: (id) => ({
        url: `/events/${id}`,
      }),
    }),
    createEvents: builder.mutation({
      query: (data) => ({
        url: "/events",
        method: "POST",
        body: data,
      }),
    }),
    updateEvents: builder.mutation({
      query: ({ id, data }) => ({
        url: `/events/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteEvents: builder.mutation({
      query: (id) => ({
        url: `/events/${id}`,
        method: "DELETE",
      }),
    }),
    getContactForms: builder.query<ContactForm, number>({
      query: (page = 1) => ({
        url: `/contact-forms?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleContactForms: builder.query<ContactForm, string>({
      query: (id) => ({
        url: `/contact-forms/${id}`,
      }),
    }),
    createContactForms: builder.mutation({
      query: (data) => ({
        url: "/contact-forms",
        method: "POST",
        body: data,
      }),
    }),
    deleteContactForms: builder.mutation({
      query: (id) => ({
        url: `/contact-forms/${id}`,
        method: "DELETE",
      }),
    }),
    getContactDetails: builder.query<ContactDetails, number>({
      query: (page = 1) => ({
        url: `/contact-details?page=${page}`,
      }),
      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleContactDetails: builder.query<ContactDetails, string>({
      query: (id) => ({
        url: `/contact-details/${id}`,
      }),
    }),
    createContactDetails: builder.mutation({
      query: (data) => ({
        url: "/contact-details",
        method: "POST",
        body: data,
      }),
    }),
    updateContactDetails: builder.mutation({
      query: ({ id, data }) => ({
        url: `/contact-details/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteContactDetails: builder.mutation({
      query: (id) => ({
        url: `/contact-details/${id}`,
        method: "DELETE",
      }),
    }),
    getNewsLetter: builder.query<NewsLetter, number>({
      query: (page = 1) => ({
        url: `/news-letters?page=${page}`,
      }),
      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleNewsLetter: builder.query<NewsLetter, string>({
      query: (id) => ({
        url: `/news-letters/${id}`,
      }),
    }),
    createNewsLetter: builder.mutation({
      query: (data) => ({
        url: "/news-letters",
        method: "POST",
        body: data,
      }),
    }),
    updateNewsLetter: builder.mutation({
      query: ({ id, data }) => ({
        url: `/news-letters/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteNewsLetter: builder.mutation({
      query: (id) => ({
        url: `/news-letters/${id}`,
        method: "DELETE",
      }),
    }),
    getSocialMedia: builder.query<SocialMedia, number>({
      query: (page = 1) => ({
        url: `/social-medias?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleSocialMedia: builder.query<SocialMedia, string>({
      query: (id) => ({
        url: `/social-medias/${id}`,
      }),
    }),
    createSocialMedia: builder.mutation({
      query: (data) => ({
        url: "/social-medias",
        method: "POST",
        body: data,
      }),
    }),
    updateSocialMedia: builder.mutation({
      query: ({ id, data }) => ({
        url: `/social-medias/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteSocialMedia: builder.mutation({
      query: (id) => ({
        url: `/social-medias/${id}`,
        method: "DELETE",
      }),
    }),
    getFaq: builder.query<FAQ, number>({
      query: (page = 1) => ({
        url: `/faqs?page=${page}`,
      }),
      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleFaq: builder.query<FAQ, string>({
      query: (id) => ({
        url: `/faqs/${id}`,
      }),
    }),
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faqs",
        method: "POST",
        body: data,
      }),
    }),
    updateFaq: builder.mutation({
      query: ({ id, data }) => ({
        url: `/faqs/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faqs/${id}`,
        method: "DELETE",
      }),
    }),
    getCareerVolunteer: builder.query<CareerVolunteer, number>({
      query: (page = 1) => ({
        url: `/position-categories?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleCareerVolunteer: builder.query<CareerVolunteer, string>({
      query: (id) => ({
        url: `/position-categories/${id}`,
      }),
    }),
    createCareerVolunteer: builder.mutation({
      query: (data) => ({
        url: "/position-categories",
        method: "POST",
        body: data,
      }),
    }),
    updateCareerVolunteer: builder.mutation({
      query: ({ id, data }) => ({
        url: `/position-categories/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCareerVolunteer: builder.mutation({
      query: (id) => ({
        url: `/position-categories/${id}`,
        method: "DELETE",
      }),
    }),
    getPosition: builder.query<Position, number>({
      query: (page = 1) => ({
        url: `/positions?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSinglePosition: builder.query<Position, string>({
      query: (id) => ({
        url: `/position-categories/${id}`,
      }),
    }),
    createPosition: builder.mutation({
      query: (data) => ({
        url: "/positions",
        method: "POST",
        body: data,
      }),
    }),
    updatePosition: builder.mutation({
      query: ({ id, data }) => ({
        url: `/positions/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deletePosition: builder.mutation({
      query: (id) => ({
        url: `/positions/${id}`,
        method: "DELETE",
      }),
    }),
    getProgrammes: builder.query<Programmes, number>({
      query: (page = 1) => ({
        url: `/programmes?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleProgrammes: builder.query<Programmes, string>({
      query: (id) => ({
        url: `/programmes/${id}`,
      }),
    }),
    createProgrammes: builder.mutation({
      query: (data) => ({
        url: "/programmes",
        method: "POST",
        body: data,
      }),
    }),
    updateProgrammes: builder.mutation({
      query: ({ id, data }) => ({
        url: `/programmes/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteProgrammes: builder.mutation({
      query: (id) => ({
        url: `/programmes/${id}`,
        method: "DELETE",
      }),
    }),
    getCourses: builder.query<Courses, number>({
      query: (page = 1) => ({
        url: `/courses?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleCourses: builder.query<Courses, string>({
      query: (id) => ({
        url: `/courses/${id}`,
      }),
    }),
    createCourses: builder.mutation({
      query: (data) => ({
        url: "/courses",
        method: "POST",
        body: data,
      }),
    }),
    updateCourses: builder.mutation({
      query: ({ id, data }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCourses: builder.mutation({
      query: (id) => ({
        url: `/courses/${id}`,
        method: "DELETE",
      }),
    }),
    getPublicationCategories: builder.query<PublicationCategories, number>({
      query: (page) => ({
        url: `/publication-categories?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSinglePublicationCategories: builder.query<
      PublicationCategories,
      string
    >({
      query: (id) => ({
        url: `/publication-categories/${id}`,
      }),
    }),
    createPublicationCategories: builder.mutation({
      query: (data) => ({
        url: "/publication-categories",
        method: "POST",
        body: data,
      }),
    }),
    updatePublicationCategories: builder.mutation({
      query: ({ id, data }) => ({
        url: `/publication-categories/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deletePublicationCategories: builder.mutation({
      query: (id) => ({
        url: `/publication-categories/${id}`,
        method: "DELETE",
      }),
    }),
    getPublication: builder.query<Publication, number>({
      query: (page = 1) => ({
        url: `/publications?page=${page}`,
      }),
      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSinglePublications: builder.query<PublicationCategories, string>({
      query: (id) => ({
        url: `/publication-categories/${id}`,
      }),
    }),
    createPublications: builder.mutation({
      query: (data) => ({
        url: "/publications",
        method: "POST",
        body: data,
      }),
    }),
    updatePublications: builder.mutation({
      query: ({ id, data }) => ({
        url: `/publications/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deletePublications: builder.mutation({
      query: (id) => ({
        url: `/publications/${id}`,
        method: "DELETE",
      }),
    }),
    getSpecialEnquiry: builder.query<SpecialEnquiry, number>({
      query: (page = 1) => ({
        url: `/special-enquiries?page=${page}`,
      }),
      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleSpecialEnquiry: builder.query<SpecialEnquiry, string>({
      query: (id) => ({
        url: `/special-enquiries/${id}`,
      }),
    }),
    createSpecialEnquiry: builder.mutation({
      query: (data) => ({
        url: "/special-enquiries",
        method: "POST",
        body: data,
      }),
    }),
    updateSpecialEnquiry: builder.mutation({
      query: ({ id, data }) => ({
        url: `/special-enquiries/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteSpecialEnquiry: builder.mutation({
      query: (id) => ({
        url: `/special-enquiries/${id}`,
        method: "DELETE",
      }),
    }),
    getAdmissionDetails: builder.query<AdmissionDetails, number>({
      query: (page = 1) => ({
        url: `/admission-details?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleAdmissionDetails: builder.query<AdmissionDetails, string>({
      query: (id) => ({
        url: `/admission-details/${id}`,
      }),
    }),
    createAdmissionDetails: builder.mutation({
      query: (data) => ({
        url: "/admission-details",
        method: "POST",
        body: data,
      }),
    }),
    updateAdmissionDetails: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admission-details/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteAdmissionDetails: builder.mutation({
      query: (id) => ({
        url: `/admission-details/${id}`,
        method: "DELETE",
      }),
    }),
    getAdmissionFaqs: builder.query<AdmissionFaq, number>({
      query: (page = 1) => ({
        url: `/admission-faqs?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleAdmissionFaqs: builder.query<AdmissionFaq, string>({
      query: (id) => ({
        url: `/admission-faqs/${id}`,
      }),
    }),
    createAdmissionDetailFaqs: builder.mutation({
      query: (data) => ({
        url: "/admission-faqs",
        method: "POST",
        body: data,
      }),
    }),
    updateAdmissionFaqs: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admission-faqs/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteAdmissionFaqs: builder.mutation({
      query: (id) => ({
        url: `/admission-faqs/${id}`,
        method: "DELETE",
      }),
    }),

    getStaffs: builder.query<StaffResponse, number>({
      query: (page = 1) => ({
        url: `/staffs?page=${page}`,
      }),
      transformResponse: (response: any): StaffResponse => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleStaffs: builder.query<Staff, string>({
      query: (id) => ({
        url: `/staffs/${id}`,
      }),
    }),
    createStaffs: builder.mutation({
      query: (data) => ({
        url: "/staffs",
        method: "POST",
        body: data,
      }),
    }),
    updateStaffs: builder.mutation({
      query: ({ id, data }) => ({
        url: `/staffs/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteStaffs: builder.mutation({
      query: (id) => ({
        url: `/staffs/${id}`,
        method: "DELETE",
      }),
    }),
    getPartnerships: builder.query<Partnership, number>({
      query: (page = 1) => ({
        url: `/partnerships?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSinglePartnerships: builder.query<Partnership, string>({
      query: (id) => ({
        url: `/partnerships/${id}`,
      }),
    }),
    createPartnerships: builder.mutation({
      query: (data) => ({
        url: "/partnerships",
        method: "POST",
        body: data,
      }),
    }),
    updatePartnerships: builder.mutation({
      query: ({ id, data }) => ({
        url: `/partnerships/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deletePartnerships: builder.mutation({
      query: (id) => ({
        url: `/partnerships/${id}`,
        method: "DELETE",
      }),
    }),
    getCollaborations: builder.query<Collaborations, number>({
      query: (page = 1) => ({
        url: `/collaborations?page=${page}`,
      }),

      transformResponse: (response: any) => ({
        data: response.data?.data || response.data || [],
        totalItems: response.data.meta?.total || response.total || 0,
        totalPages:
          response.data.meta?.totalPage ||
          Math.ceil(
            (response.data?.total ||
              response.data.meta?.total ||
              response.total ||
              0) / (response.data?.per_page || response.meta?.per_page || 10)
          ),
      }),
    }),
    getSingleCollaborations: builder.query<Collaborations, string>({
      query: (id) => ({
        url: `/collaborations/${id}`,
      }),
    }),
    createCollaborations: builder.mutation({
      query: (data) => ({
        url: "/collaborations",
        method: "POST",
        body: data,
      }),
    }),
    updateCollaborations: builder.mutation({
      query: ({ id, data }) => ({
        url: `/collaborations/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteCollaborations: builder.mutation({
      query: (id) => ({
        url: `/collaborations/${id}`,
        method: "DELETE",
      }),
    }),
    getStats: builder.query<Stats, void>({
      query: () => ({
        url: "/dashboard/stats",
      }),
    }),
  }),
});

// Explicitly define the type of crudApi
export const {
  useGetStatsQuery,
  useLoginMutation,
  useRegisterMutation,
  useGetHeroSectionQuery,
  useCreateAboutMutation,
  useCreateHeroMutation,
  useDeleteAboutMutation,
  useDeleteHeroMutation,
  useForgetPasswordMutation,
  useGetAboutQuery,
  useGetSingleAboutQuery,
  useGetSingleHeroSectionQuery,
  useResetPasswordMutation,
  useUpdateAboutMutation,
  useUpdateHeroMutation,
  useVerifyPasswordMutation,
  useCreateBoardMemberMutation,
  useCreateBoardMembersMutation,
  useCreateEventTypesMutation,
  useCreateHistoryMutation,
  useCreateNewsCategoryMutation,
  useCreateNewsMutation,
  useCreatePartnersMutation,
  useCreateTestimoniesMutation,
  useDeleteBoardMemberMutation,
  useDeleteBoardMembersMutation,
  useDeleteEventTypesMutation,
  useDeleteHistoryMutation,
  useDeleteNewsCategoryMutation,
  useDeleteNewsMutation,
  useDeletePartnersMutation,
  useDeleteTestimoniesMutation,
  useGetBoardMemberQuery,
  useGetBoardMembersQuery,
  useGetEventTypesQuery,
  useGetHistoriesQuery,
  useGetNewsCategoryQuery,
  useGetNewsQuery,
  useGetPartnersQuery,
  useGetSingleBoardMemberQuery,
  useGetSingleBoardMembersQuery,
  useGetSingleEventTypesQuery,
  useGetSingleHistoryQuery,
  useGetSingleNewsCategoryQuery,
  useGetSingleNewsQuery,
  useGetSinglePartnersQuery,
  useGetSingleTestimoniesQuery,
  useGetTestimoniesQuery,
  useUpdateTestimoniesMutation,
  useUpdateBoardMemberMutation,
  useUpdateBoardMembersMutation,
  useUpdateEventTypesMutation,
  useUpdateHistoryMutation,
  useUpdateNewsCategoryMutation,
  useUpdateNewsMutation,
  useUpdatePartnersMutation,
  useCreateAdmissionDetailFaqsMutation,
  useCreateAdmissionDetailsMutation,
  useCreateCareerVolunteerMutation,
  useCreateCollaborationsMutation,
  useCreateContactDetailsMutation,
  useCreateContactFormsMutation,
  useCreateCoursesMutation,
  useCreateEventsMutation,
  useCreateFaqMutation,
  useCreateNewsLetterMutation,
  useCreatePartnershipsMutation,
  useCreatePositionMutation,
  useCreateProgrammesMutation,
  useCreatePublicationCategoriesMutation,
  useCreatePublicationsMutation,
  useCreateSocialMediaMutation,
  useCreateSpecialEnquiryMutation,
  useCreateStaffsMutation,
  useDeleteAdmissionDetailsMutation,
  useDeleteAdmissionFaqsMutation,
  useDeleteCareerVolunteerMutation,
  useDeleteCollaborationsMutation,
  useDeleteContactDetailsMutation,
  useDeleteContactFormsMutation,
  useDeleteCoursesMutation,
  useDeleteEventsMutation,
  useDeleteFaqMutation,
  useDeleteNewsLetterMutation,
  useDeletePartnershipsMutation,
  useDeletePositionMutation,
  useDeleteProgrammesMutation,
  useDeletePublicationCategoriesMutation,
  useDeletePublicationsMutation,
  useDeleteSocialMediaMutation,
  useDeleteSpecialEnquiryMutation,
  useDeleteStaffsMutation,
  useGetAdmissionDetailsQuery,
  useGetAdmissionFaqsQuery,
  useGetCareerVolunteerQuery,
  useGetCollaborationsQuery,
  useGetContactDetailsQuery,
  useGetContactFormsQuery,
  useGetCoursesQuery,
  useGetEventsQuery,
  useGetFaqQuery,
  useGetNewsLetterQuery,
  useGetPartnershipsQuery,
  useGetPositionQuery,
  useGetProgrammesQuery,
  useGetPublicationCategoriesQuery,
  useGetPublicationQuery,
  useGetSingleAdmissionDetailsQuery,
  useGetSingleAdmissionFaqsQuery,
  useGetSingleCareerVolunteerQuery,
  useGetSingleCollaborationsQuery,
  useGetSingleContactDetailsQuery,
  useGetSingleContactFormsQuery,
  useGetSingleCoursesQuery,
  useGetSingleEventsQuery,
  useGetSingleFaqQuery,
  useGetSingleNewsLetterQuery,
  useGetSinglePartnershipsQuery,
  useGetSinglePositionQuery,
  useGetSingleProgrammesQuery,
  useGetSinglePublicationCategoriesQuery,
  useGetSinglePublicationsQuery,
  useGetSingleSocialMediaQuery,
  useGetSingleSpecialEnquiryQuery,
  useGetSingleStaffsQuery,
  useGetSocialMediaQuery,
  useGetSpecialEnquiryQuery,
  useGetStaffsQuery,
  useUpdateAdmissionDetailsMutation,
  useUpdateAdmissionFaqsMutation,
  useUpdateCareerVolunteerMutation,
  useUpdateCollaborationsMutation,
  useUpdateContactDetailsMutation,
  useUpdateCoursesMutation,
  useUpdateEventsMutation,
  useUpdateFaqMutation,
  useUpdateNewsLetterMutation,
  useUpdatePartnershipsMutation,
  useUpdatePositionMutation,
  useUpdateProgrammesMutation,
  useUpdatePublicationCategoriesMutation,
  useUpdatePublicationsMutation,
  useUpdateSocialMediaMutation,
  useUpdateSpecialEnquiryMutation,
  useUpdateStaffsMutation,
} = crudApi;
export type { EndpointBuilder } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
export type { EndpointDefinitions } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
