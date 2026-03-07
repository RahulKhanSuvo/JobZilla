import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { SiGoogledocs } from "react-icons/si";
import { TbBriefcase2Filled } from "react-icons/tb";
import { FaFileCircleCheck } from "react-icons/fa6";
import { RiGroup2Fill } from "react-icons/ri";
import {
  IoDocumentTextSharp,
  IoNotifications,
  IoSettings,
} from "react-icons/io5";
import { BiSolidMessageDetail } from "react-icons/bi";
export const candidateSidebarData = [
  {
    title: "Dashboard",
    href: "dashboard",
    icon: MdDashboard,
  },
  {
    title: "Profile",
    href: "profile",
    icon: FaUser,
  },
  {
    title: "My CV",
    href: "my-cv",
    icon: SiGoogledocs,
  },
  {
    title: "Saved Jobs",
    href: "saved-jobs",
    icon: TbBriefcase2Filled,
  },
  {
    title: "My Applied Jobs",
    href: "my-applied-jobs",
    icon: FaFileCircleCheck,
  },
  {
    title: "Followed Companies",
    href: "followed-companies",
    icon: RiGroup2Fill,
  },
  {
    title: "Messages",
    href: "messages",
    icon: BiSolidMessageDetail,
  },
  {
    title: "Notifications",
    href: "notifications",
    icon: IoNotifications,
  },
  {
    title: "Settings",
    href: "settings",
    icon: IoSettings,
  },
];

export const recruiterSidebarData = [
  {
    title: "Dashboard",
    href: "dashboard",
    icon: MdDashboard,
  },
  {
    title: "Profile",
    href: "profile",
    icon: FaUser,
  },
  {
    title: "My Jobs",
    href: "my-jobs",
    icon: TbBriefcase2Filled,
  },

  {
    title: "Applicants",
    href: "applicants",
    icon: IoDocumentTextSharp,
  },
  {
    title: "Messages",
    href: "messages",
    icon: BiSolidMessageDetail,
  },
  {
    title: "Saved Candidates",
    href: "saved-candidates",
    icon: FaUser,
  },
  {
    title: "Notifications",
    href: "notifications",
    icon: IoNotifications,
  },
  {
    title: "Settings",
    href: "setting",
    icon: IoSettings,
  },
];
