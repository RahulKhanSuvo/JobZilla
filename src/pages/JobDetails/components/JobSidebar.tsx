import {
  Globe,
  Mail,
  Phone,
  Users,
  Facebook,
  Twitter,
  Linkedin,
  Github,
  Plus,
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
];

export default function JobSidebar() {
  return (
    <div className="space-y-8 mt-2.5">
      {/* Info List */}
      <div className="bg-[#F5F5F5] dark:bg-slate-900/50 rounded p-6 space-y-6">
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
            About Company
          </h3>
          <div className="space-y-4">
            {infoItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between group cursor-default border-b pb-3 border-slate-200 dark:border-slate-800"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {item.label}
                  </span>
                </div>
                <span className="text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Button className="w-full h-12 bg-white hover:bg-slate-50 text-emerald-600 border border-emerald-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700/50 font-bold rounded-lg shadow-sm transition-all active:scale-[0.98]">
          <Plus className="size-4 mr-2" />
          Follow Company
        </Button>

        <div className="pt-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
            Official Socials
          </p>
          <div className="flex items-center gap-3">
            {[Facebook, Twitter, Linkedin, Github].map((Icon, i) => (
              <Button
                key={i}
                variant="outline"
                size="icon"
                className="size-10 rounded-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20 transition-all hover:-translate-y-1"
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
