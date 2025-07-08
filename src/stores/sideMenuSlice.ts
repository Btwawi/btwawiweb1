import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: "Home",
      title: "Dashboard",
      pathname: "/",
    },
    {
      icon: "Box",
      title: "Hero Section",
      pathname: "/hero-section",
    },
    {
      icon: "ShoppingBag",
      title: "About",
      subMenu: [
        {
          icon: "ShoppingBag",
          title: "About Us",
          pathname: "/about-us",
        },
        {
          icon: "Inbox",
          pathname: "/histories",
          title: "Histories",
        },
        {
          icon: "HardDrive",
          title: "Board Member",
          subMenu: [
            {
              icon: "Activity",
              pathname: "/board-members",
              title: "Board Members",
            },
            {
              icon: "Activity",
              pathname: "/board-member-categories",
              title: "Board Members Categories",
            },
          ],
        },
      ],
    },
    {
      icon: "Activity",
      title: "Programmes",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/programmes",
          title: "Programmes",
        },
        {
          icon: "Activity",
          pathname: "/courses",
          title: "Courses",
        },
      ],
    },

    {
      icon: "Archive",
      title: "News And Events",
      subMenu: [
        { icon: "MessageSquare", pathname: "/news", title: "News" },
        {
          icon: "MessageSquare",
          pathname: "/news-categories",
          title: "News Categories",
        },
        {
          icon: "Calendar",
          pathname: "/event",
          title: "Event",
        },
        { icon: "Calendar", pathname: "/event-type", title: "Event Type" },
      ],
    },
    {
      icon: "CreditCard",
      pathname: "/our-partner",
      title: "Our Partner",
    },

    {
      icon: "FileText",
      pathname: "/testimony",
      title: "Testimony",
    },
    "divider",
    {
      icon: "Airplay",
      title: "Research and Publications",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/publication-category",
          title: "Publication Category",
        },
        {
          icon: "Activity",
          pathname: "/publication",
          title: "Publication",
        },
      ],
    },
    {
      icon: "Edit",
      title: "Contact",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/contact-form",
          title: "Contact Form",
        },
        {
          icon: "Activity",
          pathname: "/contact-details",
          title: "Contact Details",
        },
        {
          icon: "Trello",
          title: "Social Media",
          pathname: "/social-media",
        },
      ],
    },
    {
      icon: "Users",
      pathname: "/newsletter",
      title: "NewsLetter",
    },

    {
      icon: "Layout",
      title: "FAQ",
      pathname: "/faq",
    },
    "divider",
    {
      icon: "Inbox",
      title: "Career and Volunteer",
      subMenu: [
        {
          icon: "Activity",
          title: "Position Category",
          pathname: "/position-category",
        },
        {
          icon: "Activity",
          title: "Position",
          pathname: "/position",
        },

        {
          icon: "Activity",
          pathname: "/special-enquiry",
          title: "Special Enquiry",
        },
      ],
    },
    {
      icon: "Sidebar",
      title: "Admission",
      subMenu: [
        {
          icon: "Activity",
          pathname: "/admission-details",
          title: "Admission Details",
        },
        {
          icon: "Activity",
          pathname: "/admission-faq",
          title: "Admission FAQ",
        },
      ],
    },
    {
      icon: "HardDrive",
      title: "Staff",
      pathname: "/staff",
    },
    {
      icon: "HardDrive",
      title: "Partnerships and Collaborations",
      subMenu: [
        {
          icon: "Activity",
          title: "Partnership",
          pathname: "/partnership",
        },
        {
          icon: "Activity",
          title: "Collaborations",
          pathname: "/collaborations",
        },
      ],
    },
  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
