import _ from "lodash";
import clsx from "clsx";
import { useEffect, useMemo, useRef, useState } from "react";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import Pagination from "../../base-components/Pagination";
import { FormSelect } from "../../base-components/Form";
import TinySlider, {
  TinySliderElement,
} from "../../base-components/TinySlider";
import Lucide from "../../base-components/Lucide";
import Litepicker from "../../base-components/Litepicker";
import ReportDonutChart from "../../components/ReportDonutChart";
import ReportLineChart from "../../components/ReportLineChart";
import ReportPieChart from "../../components/ReportPieChart";
import { Menu } from "../../base-components/Headless";
import Table from "../../base-components/Table";
import {
  InformationCircleIcon,
  ClockIcon,
  UsersIcon,
  BookOpenIcon,
  BookmarkIcon,
  NewspaperIcon,
  CalendarIcon,
  HandRaisedIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  AcademicCapIcon,
  ShoppingCartIcon,
  EyeIcon,
  CreditCardIcon,
  SpeakerWaveIcon,
} from "@heroicons/react/24/outline";
import { useGetStatsQuery } from "../../stores/api/apiSlice";

// Types
type ContentKey = keyof CountsData;

interface CountsData {
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
  total_purchased_course: number;
  visitors: number;
  upcomingEvents: Array<{
    uuid: string;
    title: string;
    date: string;
    location: string;
    topic: string;
    description: string;
    image: string;
    slug: string;
    date_created: string;
  }>;
  top_selling_course: Array<{
    uuid: string;
    title: string;
    slug: string;
    description: string;
    image: string;
    courseCode: string;
    ects: string;
    mandatory: boolean;
    date: {
      "end-date": string;
      "start-date": string;
    };
    duration: string;
    fee: string;
    learningOutcomes: string;
    assessment: string;
    status: string;
    target_audience: string | null;
    course_chair_bio: string | null;
    location: string | null;
    language: string;
    date_created: string;
  }>;
  recent_payments: Array<{
    uuid: string;
    user: string;
    amount: number;
    date: string;
    status: string;
    course: {
      uuid: string;
      title: string;
      description: string;
      fee: number;
    };
  }>;
  recent_announcement: Array<{
    uuid: string;
    title: string;
    slug: string;
    content: string;
    createdAt: string;
  }>;
}

interface StatsApiResponse {
  status: string;
  statusCode: number;
  message: string;
  data: CountsData;
}

// Configuration
const filterOptions = [
  { value: "all", label: "All Categories" },
  { value: "news", label: "News" },
  { value: "events", label: "Events" },
  { value: "publications", label: "Publications" },
  { value: "programmes", label: "Programmes" },
  { value: "courses", label: "Courses" },
];

const contentConfig: Record<
  ContentKey,
  {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    color: string;
    category: "content" | "educational" | "community" | "analytics";
    isArray?: boolean;
  }
> = {
  aboutUs: {
    icon: InformationCircleIcon,
    label: "About Us",
    color: "text-blue-600",
    category: "content",
  },
  histories: {
    icon: ClockIcon,
    label: "Histories",
    color: "text-amber-600",
    category: "content",
  },
  boardMembers: {
    icon: UsersIcon,
    label: "Board Members",
    color: "text-green-600",
    category: "community",
  },
  programmes: {
    icon: BookOpenIcon,
    label: "Programmes",
    color: "text-purple-600",
    category: "educational",
  },
  courses: {
    icon: BookmarkIcon,
    label: "Courses",
    color: "text-red-600",
    category: "educational",
  },
  news: {
    icon: NewspaperIcon,
    label: "News",
    color: "text-blue-600",
    category: "content",
  },
  events: {
    icon: CalendarIcon,
    label: "Events",
    color: "text-amber-600",
    category: "content",
  },
  partners: {
    icon: HandRaisedIcon,
    label: "Partners",
    color: "text-green-600",
    category: "community",
  },
  testimonies: {
    icon: ChatBubbleLeftIcon,
    label: "Testimonies",
    color: "text-purple-600",
    category: "community",
  },
  publications: {
    icon: DocumentTextIcon,
    label: "Publications",
    color: "text-red-600",
    category: "educational",
  },
  newsletter: {
    icon: EnvelopeIcon,
    label: "Newsletter",
    color: "text-blue-600",
    category: "content",
  },
  faqs: {
    icon: QuestionMarkCircleIcon,
    label: "FAQs",
    color: "text-amber-600",
    category: "content",
  },
  upcomingEvents: {
    icon: CalendarIcon,
    label: "Upcoming Events",
    color: "text-green-600",
    category: "content",
    isArray: true,
  },
  top_selling_course: {
    icon: AcademicCapIcon,
    label: "Top Selling Courses",
    color: "text-purple-600",
    category: "analytics",
    isArray: true,
  },
  total_purchased_course: {
    icon: ShoppingCartIcon,
    label: "Total Purchased Courses",
    color: "text-red-600",
    category: "analytics",
  },
  visitors: {
    icon: EyeIcon,
    label: "Visitors",
    color: "text-blue-600",
    category: "analytics",
  },
  recent_payments: {
    icon: CreditCardIcon,
    label: "Recent Payments",
    color: "text-green-600",
    category: "analytics",
    isArray: true,
  },
  recent_announcement: {
    icon: SpeakerWaveIcon,
    label: "Recent Announcements",
    color: "text-amber-600",
    category: "content",
    isArray: true,
  },
};

// Components
const StatCard = ({
  icon: Icon,
  label,
  color,
  value,
  loading = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  color: string;
  value: number | string;
  loading?: boolean;
}) => {
  return (
    <div className="">
      <div className="relative zoom-in before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70">
        <div className="p-5 box">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-gray-50`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className="text-3xl font-bold text-gray-900">
                  {loading ? "..." : value}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UpcomingEvents = ({
  events,
}: {
  events: CountsData["upcomingEvents"];
}) => {
  if (!events || events.length === 0) {
    return (
      <div className="p-5 text-center text-gray-500">
        No upcoming events scheduled
      </div>
    );
  }

  return (
    <div className="mt-5">
      {events.map((event) => (
        <div
          key={event.uuid}
          className="p-4 mb-3 rounded-md bg-slate-50 dark:bg-darkmode-400"
        >
          <div className="flex items-center">
            <div className="flex-none w-12 h-12 overflow-hidden rounded-md">
              <img
                src={event.image}
                alt={event.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="ml-4">
              <h3 className="font-medium">{event.title}</h3>
              <p className="text-sm text-gray-500">
                {new Date(event.date).toLocaleDateString()} • {event.location}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const RecentPayments = ({
  payments,
}: {
  payments: CountsData["recent_payments"];
}) => {
  if (!payments || payments.length === 0) {
    return (
      <div className="p-5 text-center text-gray-500">
        No recent payments found
      </div>
    );
  }

  return (
    <div className="mt-5 overflow-x-auto border border-gray-200 rounded-lg bg-white">
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="whitespace-nowrap">User</Table.Th>
            <Table.Th className="whitespace-nowrap">Course</Table.Th>
            <Table.Th className="whitespace-nowrap">Amount</Table.Th>
            <Table.Th className="whitespace-nowrap">Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {payments.map((payment) => (
            <Table.Tr key={payment.uuid}>
              <Table.Td>{payment.user}</Table.Td>
              <Table.Td>{payment.course.title}</Table.Td>
              <Table.Td>${payment.amount}</Table.Td>
              <Table.Td>
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    payment.status === "paid"
                      ? "bg-success/20 text-success"
                      : "bg-warning/20 text-warning"
                  }`}
                >
                  {_.capitalize(payment.status)}
                </span>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
};

const TopSellingCourses = ({
  courses,
}: {
  courses: CountsData["top_selling_course"];
}) => {
  if (!courses || courses.length === 0) {
    return (
      <div className="p-5 text-center text-gray-500">
        No top selling courses data available
      </div>
    );
  }

  return (
    <div className="mt-5">
      {courses.map((course) => (
        <div
          key={course.uuid}
          className="p-4 mb-3 rounded-md bg-slate-50 dark:bg-darkmode-400"
        >
          <div className="flex items-start">
            <div className="flex-none w-12 h-12 overflow-hidden rounded-md">
              <img
                src={course.image}
                alt={course.title}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="ml-4">
              <h3 className="font-medium">{course.title}</h3>
              <p className="text-sm text-gray-500">
                ${course.fee} • {course.duration}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {new Date(course.date["start-date"]).toLocaleDateString()} -{" "}
                {new Date(course.date["end-date"]).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const RecentAnnouncements = ({
  announcements,
}: {
  announcements: CountsData["recent_announcement"];
}) => {
  if (!announcements || announcements.length === 0) {
    return (
      <div className="p-5 text-center text-gray-500">
        No recent announcements
      </div>
    );
  }

  return (
    <div className="mt-5">
      {announcements.map((announcement) => (
        <div
          key={announcement.uuid}
          className="p-4 mb-3 rounded-md bg-slate-50 dark:bg-darkmode-400"
        >
          <h3 className="font-medium">{announcement.title}</h3>
          <p className="mt-1 text-sm text-gray-500">
            {new Date(announcement.createdAt).toLocaleDateString()}
          </p>
          <p className="mt-2 text-sm text-gray-600 line-clamp-2">
            {announcement.content}
          </p>
        </div>
      ))}
    </div>
  );
};

function Main() {
  const [salesReportFilter, setSalesReportFilter] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    filterOptions[0].value
  );
  const [selectedLabel, setSelectedLabel] = useState<string>(
    filterOptions[0].label
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const importantNotesRef = useRef<TinySliderElement>();
  const prevImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("prev");
  };
  const nextImportantNotes = () => {
    importantNotesRef.current?.tns.goTo("next");
  };

  const { data, isLoading, isError } = useGetStatsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      data: result.data as StatsApiResponse | undefined,
    }),
  });

  const counts = useMemo(() => {
    if (isLoading || !data?.data) {
      return {
        aboutUs: 0,
        histories: 0,
        boardMembers: 0,
        programmes: 0,
        courses: 0,
        news: 0,
        events: 0,
        partners: 0,
        testimonies: 0,
        publications: 0,
        newsletter: 0,
        faqs: 0,
        upcomingEvents: [],
        top_selling_course: [],
        total_purchased_course: 0,
        visitors: 0,
        recent_payments: [],
        recent_announcement: [],
      };
    }
    return data.data;
  }, [data, isLoading]);

  const groupedCounts = useMemo(() => {
    const groups: Record<
      string,
      Array<{ key: ContentKey; value: number | any[] }>
    > = {
      content: [],
      educational: [],
      community: [],
      analytics: [],
    };

    Object.entries(counts).forEach(([key, value]) => {
      const contentKey = key as ContentKey;
      const config = contentConfig[contentKey];
      if (config) {
        groups[config.category].push({ key: contentKey, value });
      }
    });

    return groups;
  }, [counts]);

  const renderStatCards = () => {
    return Object.entries(contentConfig).map(([key, config]) => {
      // Skip array-based stats in the main cards view
      if (config.isArray) return null;

      const value = counts[key as ContentKey];
      if (typeof value !== "number") return null;

      return (
        <StatCard
          key={key}
          icon={config.icon}
          label={config.label}
          color={config.color}
          value={value}
          loading={isLoading}
        />
      );
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="p-5 text-center text-red-500">
          Failed to load dashboard data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-6 justify-items-center">
      <div className="col-span-12 2xl:col-span-12">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 mt-8">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Content Overview
              </h2>
              <a href="" className="flex items-center ml-auto text-primary">
                <Lucide icon="RefreshCcw" className="w-4 h-4 mr-3" /> Reload
                Data
              </a>
            </div>
            <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-5">
              {renderStatCards()}
            </div>
          </div>

          {/* Upcoming Events Section */}
          <div className="col-span-12 mt-8 lg:col-span-6">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Upcoming Events
              </h2>
              {/* <a href="" className="ml-auto truncate text-primary">
                View All
              </a> */}
            </div>
            <UpcomingEvents events={counts.upcomingEvents} />
          </div>

          {/* Recent Payments Section */}
          <div className="col-span-12 mt-8 lg:col-span-6">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Recent Payments
              </h2>
              {/* <a href="" className="ml-auto truncate text-primary">
                View All
              </a> */}
            </div>
            <RecentPayments payments={counts.recent_payments} />
          </div>

          {/* Top Selling Courses Section */}
          <div className="col-span-12 mt-8 lg:col-span-6">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Top Selling Courses
              </h2>
              {/* <a href="" className="ml-auto truncate text-primary">
                View All
              </a> */}
            </div>
            <TopSellingCourses courses={counts.top_selling_course} />
          </div>

          {/* Content Growth Section */}
          <div className="col-span-12 mt-8 lg:col-span-6">
            <div className="items-center block h-10 intro-y sm:flex">
              <h2 className="mr-5 text-lg font-medium truncate">
                Content Growth
              </h2>
              <div className="relative mt-3 sm:ml-auto sm:mt-0 text-slate-500">
                <Lucide
                  icon="Calendar"
                  className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3"
                />
                <Litepicker
                  value={salesReportFilter}
                  onChange={setSalesReportFilter}
                  options={{
                    autoApply: false,
                    singleMode: false,
                    numberOfColumns: 2,
                    numberOfMonths: 2,
                    showWeekNumbers: true,
                    dropdowns: {
                      minYear: 1990,
                      maxYear: null,
                      months: true,
                      years: true,
                    },
                  }}
                  className="pl-10 sm:w-56 !box"
                />
              </div>
            </div>
            <div className="p-5 mt-12 intro-y box sm:mt-5">
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="flex">
                  <div>
                    <div className="text-lg font-medium text-primary dark:text-slate-300 xl:text-xl">
                      {counts.news + counts.events + counts.publications}
                    </div>
                    <div className="mt-0.5 text-slate-500">This Month</div>
                  </div>
                  <div className="w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5"></div>
                  <div>
                    <div className="text-lg font-medium text-slate-500 xl:text-xl">
                      {Math.floor(
                        (counts.news + counts.events + counts.publications) *
                          0.8
                      )}
                    </div>
                    <div className="mt-0.5 text-slate-500">Last Month</div>
                  </div>
                </div>
                <Menu className="ml-4">
                  <Menu.Button
                    as={Button}
                    variant="outline-secondary"
                    className="font-normal w-40 justify-between"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    {selectedLabel}
                    <Lucide
                      icon={isMenuOpen ? "ChevronUp" : "ChevronDown"}
                      className="w-4 h-4 ml-2"
                    />
                  </Menu.Button>
                  <Menu.Items className="w-40 h-32 overflow-y-auto">
                    {filterOptions.map((option) => (
                      <Menu.Item
                        key={option.value}
                        onClick={() => {
                          setSelectedCategory(option.value);
                          setSelectedLabel(option.label);
                          setIsMenuOpen(false);
                        }}
                      >
                        {option.label}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Menu>
              </div>
              <div
                className={clsx([
                  "relative",
                  "before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
                  "after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600",
                ])}
              >
                <ReportLineChart height={275} className="mt-6 -mb-6" />
              </div>
            </div>
          </div>

          {/* Content Distribution Section */}
          <div className="col-span-12 mt-8 sm:col-span-6 lg:col-span-6">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Content Distribution
              </h2>
              <a href="" className="ml-auto truncate text-primary">
                Show More
              </a>
            </div>
            <div className="p-5 mt-5 intro-y box">
              <div className="mt-3">
                <ReportPieChart height={213} />
              </div>
              <div className="mx-auto mt-8 w-52 sm:w-auto">
                <div className="flex items-center">
                  <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                  <span className="truncate">News & Events</span>
                  <span className="ml-auto font-medium">
                    {Math.round(
                      ((counts.news + counts.events) /
                        _.sum(
                          Object.values(counts).filter(
                            (v) => typeof v === "number"
                          )
                        )) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                  <span className="truncate">Educational Content</span>
                  <span className="ml-auto font-medium">
                    {Math.round(
                      ((counts.programmes + counts.courses) /
                        _.sum(
                          Object.values(counts).filter(
                            (v) => typeof v === "number"
                          )
                        )) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                  <span className="truncate">Other Content</span>
                  <span className="ml-auto font-medium">
                    {Math.round(
                      100 -
                        ((counts.news +
                          counts.events +
                          counts.programmes +
                          counts.courses) /
                          _.sum(
                            Object.values(counts).filter(
                              (v) => typeof v === "number"
                            )
                          )) *
                          100
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Types Section */}
          <div className="col-span-12 mt-8 sm:col-span-6 lg:col-span-6">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Content Types
              </h2>
              <a href="" className="ml-auto truncate text-primary">
                Show More
              </a>
            </div>
            <div className="p-5 mt-5 intro-y box">
              <div className="mt-3">
                <ReportDonutChart height={213} />
              </div>
              <div className="mx-auto mt-8 w-52 sm:w-auto">
                <div className="flex items-center">
                  <div className="w-2 h-2 mr-3 rounded-full bg-primary"></div>
                  <span className="truncate">Informational</span>
                  <span className="ml-auto font-medium">
                    {Math.round(
                      ((counts.aboutUs + counts.histories + counts.faqs) /
                        _.sum(
                          Object.values(counts).filter(
                            (v) => typeof v === "number"
                          )
                        )) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 mr-3 rounded-full bg-pending"></div>
                  <span className="truncate">Educational</span>
                  <span className="ml-auto font-medium">
                    {Math.round(
                      ((counts.programmes +
                        counts.courses +
                        counts.publications) /
                        _.sum(
                          Object.values(counts).filter(
                            (v) => typeof v === "number"
                          )
                        )) *
                        100
                    )}
                    %
                  </span>
                </div>
                <div className="flex items-center mt-4">
                  <div className="w-2 h-2 mr-3 rounded-full bg-warning"></div>
                  <span className="truncate">Community</span>
                  <span className="ml-auto font-medium">
                    {Math.round(
                      ((counts.boardMembers +
                        counts.partners +
                        counts.testimonies) /
                        _.sum(
                          Object.values(counts).filter(
                            (v) => typeof v === "number"
                          )
                        )) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 2xl:col-span-12 w-full max-w-[1000px] mx-auto">
        <div className="pb-10 -mb-10  shadow-lg">
          {/* Recent Announcements Section */}
          <div className="col-span-12 mt-8 lg:col-span-6">
            <div className="flex items-center h-10 intro-y">
              <h2 className="mr-5 text-lg font-medium truncate">
                Recent Announcements
              </h2>
              {/* <a href="" className="ml-auto truncate text-primary">
                View All
              </a> */}
            </div>
            <RecentAnnouncements announcements={counts.recent_announcement} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
