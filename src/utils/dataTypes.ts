import { AboutItem } from "../pages/AboutUs";
import { BoardMember } from "../pages/BoardMember";
import { ContactDetailItem } from "../pages/ContactDetails";
import { HistoryItem } from "../pages/Histories";
import { Partner } from "../pages/OurPartner";
import { PositionCategory, PositionItem } from "../pages/Position";
import { SocialMediaItem } from "../pages/SocialMedia";

export interface Hero {
  data: HeroItem[];
  totalItems: number;
  totalPages: number;
}

export interface NewsData {
  data: NewsItem[];
  totalItems: number;
  totalPages: number;
}

export interface HeroItem {
  uuid: string;
  title: string;
  caption: string;
  cta1: { title: string; link: string };
  cta2: { title: string; link: string };
  image: string;
}
export interface About {
  data: AboutItem[];
  totalItems: number;
  totalPages: number;
}
export interface Histories {
  data: HistoryItem[];
  totalItems: number;
  totalPages: number;
}

export interface BoardMemberCategoryItem {
  uuid: string;
  name: string;
  description: string;
}

export interface BoardMemberCategory {
  data: BoardMemberCategoryItem[];
  totalItems: number;
  totalPages: number;
}
export interface BoardMembers {
  data: BoardMember[];
  totalItems: number;
  totalPages: number;
}
export interface BoardMemberType {
  data: BoardMember[];
  totalItems: number;
  totalPages: number;
}
export interface Partners {
  data: Partner[];
  totalItems: number;
  totalPages: number;
}
// Correct single category object
export interface NewsCategoryItem {
  uuid: string;
  name: string;
  description: string;
}

// Paginated response for categories
export interface NewsCategory {
  data: NewsCategoryItem[];
  totalItems: number;
  totalPages: number;
}

export interface NewsItem {
  uuid: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  category: NewsCategoryItem;
  date_posted: string;
}

export interface GetNewsCategoryResponse {
  status: string;
  data: {
    data: NewsCategory[];
  };
}
export interface Testimonies {
  data: TestimonyItem[];
  totalItems: number;
  totalPages: number;
}

// interfaces.ts
export interface TestimonyItem {
  uuid: string;
  name: string;
  testimony: string;
  image: string;
}
export interface EventTypes {
  data: EventType[];
  totalItems: number;
  totalPages: number;
}
export interface Event {
  data: EventItem[];
  totalItems: number;
  totalPages: number;
}

export interface EventItem {
  uuid: string;
  title: string;
  date: string;
  location: string;
  topic: string;
  description: string;
  image: string;
  slug: string;
  event_type: EventType;
  date_created: string;
}

export interface ContactFormItem {
  uuid: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date_created: string;
}

export interface ContactForm {
  data: ContactFormItem[];
  totalItems: number;
  totalPages: number;
}
export interface ContactDetails {
  data: ContactDetailItem[];
  totalItems: number;
  totalPages: number;
}

export interface NewsletterSubscriber {
  uuid: string;
  name: string;
  email: string;
  date_created: string;
}

export interface NewsLetter {
  data: NewsletterSubscriber[];
  totalItems: number;
  totalPages: number;
}
export interface SocialMedia {
  data: SocialMediaItem[];
  totalItems: number;
  totalPages: number;
}

// Interfaces
export interface FaqItem {
  uuid: string;
  question: string;
  answer: string;
}

export interface FAQ {
  data: FaqItem[];
  totalItems: number;
  totalPages: number;
}
export interface CareerVolunteer {
  data: PositionCategory[];
  totalItems: number;
  totalPages: number;
}
export interface Position {
  data: PositionItem[];
  totalItems: number;
  totalPages: number;
}
export interface Programmes {
  data: ProgrammeItem[];
  totalItems: number;
  totalPages: number;
}

export interface ProgrammeItem {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  date_created: string;
}
export interface Courses {
  data: CourseItem[];
  totalItems: number;
  totalPages: number;
}
export interface PublicationCategories {
  data: PublicationCategory[];
  totalItems: number;
  totalPages: number;
}
export interface Publication {
  data: PublicationItem[];
  totalItems: number;
  totalPages: number;
}
export interface SpecialEnquiry {
  data: SpecialEnquiryItem[];
  totalItems: number;
  totalPages: number;
}
export interface AdmissionDetails {
  data: AdmissionDetailItem[];
  totalItems: number;
  totalPages: number;
}
export interface AdmissionFaq {
  data: FaqItem[];
  totalItems: number;
  totalPages: number;
}

export interface StaffResponse {
  data: StaffItem[];
  totalItems: number;
  totalPages: number;
}

export interface Staff {
  data: StaffItem[];
  totalItems: number;
  totalPages: number;
}
export interface Partnership {
  data: PartnershipItem[];
  totalItems: number;
  totalPages: number;
}
export interface Collaborations {
  data: CollaborationItem[];
  totalItems: number;
  totalPages: number;
}
export interface Stats {}

// interfaces/programme.ts

export interface StatsItem {
  aboutUs: number;
  histories: number;
  boardMembers: number;
  programmes: number;
  courses: number;
  news: number;
  events: number;
  partners: number;
  testimonies: number;
  publications: number;
  newsletter: number;
  faqs: number;
  upcomingEvents: number;
}

export interface Meta {
  total: number;
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface Links {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface ProgrammeData {
  data: ProgrammeItem[];
  meta: Meta;
  links: Links;
}
export interface CountsData {
  aboutUs: number;
  histories: number;
  boardMembers: number;
  programmes: number;
  courses: number;
  news: number;
  events: number;
  partners: number;
  testimonies: number;
  publications: number;
  newsletter: number;
  faqs: number;
  // upcomingEvents?: [
  //   {
  //     uuid: string;
  //     title: string;
  //     date: string;
  //     location: string;
  //     topic: string;
  //     description: string;
  //     image: string;
  //     slug: string;
  //     date_created: string;
  //   }
  // ];
  top_selling_course: [];
  total_purchased_course: number;
  visitors: number;
  // recent_payments?: [
  //   {
  //     uuid: string;
  //     user: string;
  //     amount: number;
  //     date: string;
  //     status: string;
  //     course: {
  //       uuid: string;
  //       title: string;
  //       description: string;
  //       fee: number;
  //     };
  //   }
  // ];
  // recent_announcement?: [
  //   {
  //     uuid: string;
  //     title: string;
  //     slug: string;
  //     content: string;
  //     createdAt: string;
  //   }
  // ];
}
export interface StatsData {
  counts: CountsData;
}

export interface StatsApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: CountsData;
}

export interface ProgrammeApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: ProgrammeData;
}

export interface PaginationParams {
  page?: number;
  size?: number;
}

export type ProgrammeFormType = {
  name: string;
  description: string;
  image: string | File | null;
};

// interfaces/course.ts
export interface Staff {
  uuid: string;
  name: string;
  slug: string;
  position: string;
  field: string;
  image: string;
}

export interface Programme {
  uuid: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  date_created: string;
}

export interface CourseDate {
  "end-date": string;
  "start-date": string;
}

export interface CourseItem {
  uuid: string;
  title: string;
  slug: string;
  description: string;
  programme: Programme;
  image: string;
  courseCode: string;
  ects: string;
  mandatory: boolean;
  date: CourseDate;
  duration: string;
  fee: string;
  learningOutcomes: string;
  assessment: string;
  language: string;
  status: string;
  staffs: Staff[];
  date_created: string;
  target_audience: string;
  location: string;
  course_chair_bio: string;
}

interface CourseData {
  data: CourseItem[];
  meta: Meta;
  links: Links;
}

export interface CourseApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: CourseData;
}

export type CourseFormType = {
  title: string;
  description: string;
  programmeUuid: string;
  image: string | File | null;
  courseCode: string;
  ects: string;
  mandatory: boolean;
  startDate: string;
  endDate: string;
  duration: string;
  fee: string;
  learningOutcomes: string;
  assessment: string;
  language: string;
  status: string;
  staffUuids: string[];
  target_audience: string;
  location: string;
  course_chair_bio: string;
};

// interfaces/staff.ts
export interface StaffItem {
  uuid: string;
  name: string;
  slug: string;
  position: string;
  field: string;
  image: string;
}

interface StaffData {
  data: StaffItem[];
  meta: Meta;
  links: Links;
}

export interface StaffApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: StaffData;
}

export type StaffFormType = {
  name: string;
  position: string;
  field: string;
  image: string | File | null;
};

export interface PublicationCategory {
  uuid: string;
  name: string;
  type: string;
  slug: string;
  description: string | null;
}

export interface PublicationCategoryData {
  data: PublicationCategory[];
  meta: Meta;
  links: Links;
}

export interface PublicationCategoryApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: PublicationCategoryData;
}

// Interfaces
export interface PublicationCategory {
  uuid: string;
  name: string;
  type: string;
  slug: string;
  description: string | null;
}

export interface PublicationItem {
  uuid: string;
  title: string;
  slug: string;
  image: string;
  description: string;
  file: string;
  createdAt: string;
  category: PublicationCategory;
}

export interface PublicationData {
  data: PublicationItem[];
  meta: Meta;
  links: Links;
}

export interface PublicationApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: PublicationData;
}

export interface SpecialEnquiryItem {
  uuid: string;
  title: string;
  content: string;
  order_no: number;
  active: boolean;
  keyword: string;
}

export interface SpecialEnquiryData {
  data: SpecialEnquiryItem[];
  meta: Meta;
  links: Links;
}

export interface SpecialEnquiryApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: SpecialEnquiryData;
}

export interface AdmissionDetailItem {
  uuid: string;
  title: string;
  content: string;
  order_no: number;
  active: boolean;
  keyword: string;
}

export interface AdmissionDetailsMeta {
  total: number;
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface AdmissionDetailsLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface AdmissionDetailsApiResponse {
  data: {
    data: AdmissionDetailItem[];
    meta: AdmissionDetailsMeta;
    links: AdmissionDetailsLinks;
  };
  status: string;
  statusCode: number;
  message: string;
}

// src/utils/dataTypes.ts

export interface FaqItem {
  uuid: string;
  question: string;
  answer: string;
}

export interface FaqMeta {
  total: number;
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface FaqLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface FaqData {
  data: FaqItem[];
  meta: FaqMeta;
  links: FaqLinks;
}

export interface FaqApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: FaqData;
}

export interface PartnershipImage {
  uuid: string;
  image: string;
}

export interface PartnershipItem {
  uuid: string;
  name: string;
  description: string;
  images: PartnershipImage[];
}

export interface PartnershipMeta {
  total: number;
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface PartnershipLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface PartnershipData {
  data: PartnershipItem[];
  meta: PartnershipMeta;
  links: PartnershipLinks;
}

export interface PartnershipApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: PartnershipData;
}

export interface CollaborationItem {
  uuid: string;
  title: string;
  content: string;
}

export interface CollaborationMeta {
  total: number;
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

export interface CollaborationLinks {
  first: string;
  last: string;
  prev: string | null;
  next: string | null;
}

export interface CollaborationApiResponse {
  data: {
    data: CollaborationItem[];
    meta: CollaborationMeta;
    links: CollaborationLinks;
  };
  status: string;
  statusCode: number;
  message: string;
}

export interface EventType {
  uuid: string;
  name: string;
  description: string;
}

export interface EventItem {
  uuid: string;
  title: string;
  date: string;
  location: string;
  topic: string;
  description: string;
  image: string;
  slug: string;
  event_type: EventType;
  date_created: string;
}

export interface EventData {
  data: EventItem[];
  meta: Meta;
  links: Links;
}

export interface EventApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: EventData;
}

export type EditFormType = {
  title: string;
  date: string;
  location: string;
  topic: string;
  description: string;
  event_type: string;
  image: string | File | null;
};

export interface EventTypesData {
  data: EventType[];
  meta: Meta;
  links: Links;
}

export interface EventTypesResponse {
  status: string;
  statusCode: number;
  message: string;
  data: EventTypesData;
}
