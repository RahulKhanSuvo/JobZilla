import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Send,
  MapPin,
  Phone,
  Briefcase,
  Users,
  Info,
  LifeBuoy,
} from "lucide-react";
import JobzillaLogo from "@/components/common/JobzillaLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const footerLinks = {
  candidates: {
    title: "For Candidates",
    icon: <Users className="size-5 text-primary" />,
    links: [
      { name: "Browse Jobs", href: "/find-job" },
      { name: "Applied Jobs", href: "/candidate/my-applied-jobs" },
      { name: "Saved Jobs", href: "/candidate/saved-jobs" },
      { name: "Candidate Dashboard", href: "/candidate/dashboard" },
      { name: "Job Alerts", href: "/candidate/notifications" },
    ],
  },
  recruiters: {
    title: "For Recruiters",
    icon: <Briefcase className="size-5 text-primary" />,
    links: [
      { name: "Post a Job", href: "/recruiter/post-job" },
      { name: "Browse Candidates", href: "/recruiter/candidates" },
      { name: "Recruiter Dashboard", href: "/recruiter/dashboard" },
      { name: "Pricing Plans", href: "/pricing" },
      { name: "Recruiter Help", href: "/help" },
    ],
  },
  company: {
    title: "Company",
    icon: <Info className="size-5 text-primary" />,
    links: [
      { name: "About Us", href: "/about" },
      { name: "Contact Us", href: "/contact" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Our Blog", href: "/blog" },
    ],
  },
  support: {
    title: "Support",
    icon: <LifeBuoy className="size-5 text-primary" />,
    links: [
      { name: "Help Center", href: "/help" },
      { name: "FAQ", href: "/faq" },
      { name: "Security", href: "/security" },
      { name: "Accessibility", href: "/accessibility" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
};

const socialLinks = [
  {
    icon: <Facebook className="size-5" />,
    href: "#",
    color: "hover:text-blue-600",
  },
  {
    icon: <Twitter className="size-5" />,
    href: "#",
    color: "hover:text-black dark:hover:text-white",
  },
  {
    icon: <Linkedin className="size-5" />,
    href: "#",
    color: "hover:text-blue-700",
  },
  {
    icon: <Instagram className="size-5" />,
    href: "#",
    color: "hover:text-pink-600",
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t bg-white dark:bg-slate-950 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] size-[500px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] size-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-[1905px] mx-auto px-4 lg:px-10 pt-20 pb-10">
        {/* Top Section: Newsletter CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 p-8 lg:p-12 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-sm relative group overflow-hidden">
          {/* Animated accent line */}
          <div className="absolute top-0 left-0 w-1 h-full bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />

          <div>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white font-sans">
              Stay ahead in your{" "}
              <span className="text-primary italic underline decoration-wavy decoration-2 underline-offset-4">
                career journey
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md font-lato">
              Join our community of over 50k+ professionals. Get the latest job
              openings and career advice delivered straight to your inbox.
            </p>
          </div>

          <div className="relative">
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="relative flex-1 group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Enter your email address"
                  className="pl-12 h-14 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-none focus-visible:ring-primary h-auto"
                />
              </div>
              <Button className="h-14 px-8 rounded-xl font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 group transition-all">
                Subscribe Now
                <Send className="ml-2 size-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </form>
            <p className="mt-3 text-xs text-slate-500 dark:text-slate-500 text-center sm:text-left">
              No spam. Unsubscribe at any time.
            </p>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link
              to="/"
              className="inline-block transform hover:scale-105 transition-transform origin-left"
            >
              <JobzillaLogo />
            </Link>
            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-lato max-w-sm">
              Connecting talented professionals with world-class opportunities.
              We make job hunting seamless and recruitment effortless.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group cursor-default">
                <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                  <MapPin className="size-5 text-slate-500 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-medium">
                  123 Business Avenue, New York, NY 10001
                </span>
              </div>
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400 group cursor-default">
                <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/5 transition-all">
                  <Phone className="size-5 text-slate-500 group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm font-medium">+1 (234) 567-890</span>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  whileHover={{ y: -5 }}
                  className={cn(
                    "size-12 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 transition-all",
                    social.color,
                  )}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {Object.entries(footerLinks).map(([key, section]) => (
                <div key={key} className="flex flex-col gap-6">
                  <div className="flex items-center gap-2">
                    {section.icon}
                    <h3 className="font-sans font-bold text-lg text-slate-900 dark:text-white uppercase tracking-wider">
                      {section.title}
                    </h3>
                  </div>
                  <ul className="flex flex-col gap-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          to={link.href}
                          className="text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors text-[15px] font-medium font-lato inline-flex items-center group"
                        >
                          <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all" />
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="pt-10 border-t border-slate-100 dark:border-slate-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 dark:text-slate-500 text-sm font-medium">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-900 dark:text-white font-bold">
              JobZilla
            </span>
            . All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 dark:text-slate-500 font-medium font-lato">
            <Link
              to="/privacy-policy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>

          <div className="flex items-center gap-2 p-1.5 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-950 shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="size-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400">
                System Live
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
