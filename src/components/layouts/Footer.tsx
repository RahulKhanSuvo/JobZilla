import { cn } from "@/lib/utils";
import Container from "../common/Container";
import JobzillaLogo from "@/components/common/JobzillaLogo";
import { Phone, MapPin, Send } from "lucide-react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaPinterestP,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface FooterProps {
  className?: string;
}

const footerMenu: MenuItem[] = [
  {
    title: "Quick Links",
    links: [
      { text: "Job Packages", url: "#" },
      { text: "Post New Job", url: "#" },
      { text: "Jobs Listing", url: "#" },
      { text: "Jobs Style Grid", url: "#" },
      { text: "Employer Listing", url: "#" },
      { text: "Employers Grid", url: "#" },
    ],
  },
  {
    title: "For Candidates",
    links: [
      { text: "User Dashboard", url: "#" },
      { text: "CV Packages", url: "#" },
      { text: "Candidate Listing", url: "#" },
      { text: "Candidates Grid", url: "#" },
      { text: "About us", url: "#" },
      { text: "Contact us", url: "#" },
    ],
  },
  {
    title: "For Employers",
    links: [
      { text: "Post New Job", url: "#" },
      { text: "Employer Listing", url: "#" },
      { text: "Employers Grid", url: "#" },
      { text: "Job Packages", url: "#" },
      { text: "Jobs Listing", url: "#" },
      { text: "Jobs Style Grid", url: "#" },
    ],
  },
];

const socialLinks = [
  { icon: <FaFacebookF />, url: "#" },
  { icon: <FaLinkedinIn />, url: "#" },
  { icon: <FaTwitter />, url: "#" },
  { icon: <FaPinterestP />, url: "#" },
  { icon: <FaInstagram />, url: "#" },
  { icon: <FaYoutube />, url: "#" },
];

const bottomLinks = [
  { text: "Terms Of Services", url: "#" },
  { text: "Privacy Policy", url: "#" },
  { text: "Cookie Policy", url: "#" },
];

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-[#F5F5F2] dark:bg-slate-900/50 pt-20 pb-6 transition-colors duration-300",
        className,
      )}
    >
      <Container>
        {/* Top Section - Logo & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-12 border-b border-slate-200 dark:border-slate-800 gap-8">
          <div className="flex items-center justify-center w-full md:w-auto">
            <JobzillaLogo />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="font-bold text-slate-900 dark:text-white sm:mr-2">
              Follow Us:
            </span>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  className="size-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:shadow-sm transition-all duration-300 hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Section - Contact & Links */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Contact Info (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center shrink-0">
                <Phone className="size-5 text-emerald-600 dark:text-emerald-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">
                  Need help? 24/7
                </p>
                <p className="text-xl font-black text-slate-900 dark:text-white">
                  001-1234-88888
                </p>
              </div>
            </div>

            <p className="text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              Job Searching Just Got Easy. Use Jobtex to run a hiring site and
              earn money in the process!
            </p>

            <div className="flex items-start gap-3 text-slate-500 dark:text-slate-400">
              <MapPin className="size-5 shrink-0 mt-0.5" />
              <p>101 E 129th St, East Chicago, IN 46312, US</p>
            </div>

            <div className="relative max-w-sm">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full h-12 pl-4 pr-12 rounded-xl bg-white dark:bg-slate-800 border-none shadow-sm focus:ring-2 focus:ring-emerald-500/50 outline-none text-sm dark:text-white"
              />
              <button className="absolute right-1 top-1 bottom-1 w-10 bg-emerald-500 text-white rounded-lg flex items-center justify-center hover:bg-emerald-600 transition-colors">
                <Send className="size-4" />
              </button>
            </div>
          </div>

          {/* Links Grid (8 Columns span) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {footerMenu.map((menu, idx) => (
              <div key={idx}>
                <h4 className="font-black text-slate-900 dark:text-white mb-6 text-lg">
                  {menu.title}
                </h4>
                <ul className="space-y-4">
                  {menu.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.url}
                        className="text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 font-medium transition-colors"
                      >
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section - Copyright & Legal */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-medium text-slate-500 dark:text-slate-400 text-center md:text-left">
            <p>©2026 JobZilla. All Rights Reserved.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {bottomLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
