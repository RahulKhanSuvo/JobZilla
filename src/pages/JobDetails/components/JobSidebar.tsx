import {
  Globe,
  Mail,
  Phone,
  Users,
  Calendar,
  Headphones,
  Facebook,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
const infoItems = [
  {
    label: "Website",
    value: "jobszilla.com",
    icon: Globe,
    color: "text-emerald-500",
  },
  {
    label: "Email",
    value: "hello@jobszilla.com",
    icon: Mail,
    color: "text-blue-500",
  },
  {
    label: "Phone",
    value: "+1 234 567 890",
    icon: Phone,
    color: "text-purple-500",
  },
  {
    label: "Company size",
    value: "50-100 Employees",
    icon: Users,
    color: "text-amber-500",
  },
  {
    label: "Member Since",
    value: "Aug 2021",
    icon: Calendar,
    color: "text-rose-500",
  },
  {
    label: "Front Desk",
    value: "012 333 - 555 000",
    icon: Headphones,
    color: "text-cyan-500",
  },
];

export default function JobSidebar() {
  return (
    <div className="space-y-8">
      {/* Info List */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="space-y-4">
          {infoItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between group cursor-default"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 group-hover:scale-110 transition-transform ${item.color}`}
                >
                  <item.icon className="size-4" />
                </div>
                <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                  {item.label}
                </span>
              </div>
              <span className="text-sm font-black text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Official Socials
          </p>
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
              <Button
                key={i}
                variant="outline"
                size="icon"
                className="size-10 rounded-xl bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20 shadow-sm transition-all hover:-translate-y-1"
              >
                <Icon className="size-4" />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
