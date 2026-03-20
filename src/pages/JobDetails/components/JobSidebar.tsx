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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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
      {/* Map Placeholder */}
      <div className="rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm aspect-square relative group">
        <img
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
          alt="Map"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
        />
        <div className="absolute inset-0 bg-emerald-500/10 group-hover:bg-transparent transition-colors" />
        <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between shadow-lg">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Location
            </p>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Las Vegas, NV
            </p>
          </div>
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl h-8 px-3 text-xs"
          >
            View Map
          </Button>
        </div>
      </div>

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

      {/* Contact Form */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-black text-slate-900 dark:text-white">
            Contact Us
          </h3>
          <p className="text-xs font-bold text-slate-400">
            Response within 24 hours
          </p>
        </div>
        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">
              Subject
            </label>
            <Input
              placeholder="Enter subject..."
              className="rounded-xl border-slate-200 dark:border-slate-800 focus:ring-emerald-500/20"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 ml-1">
              Message
            </label>
            <Textarea
              placeholder="How can we help?"
              className="rounded-xl border-slate-200 dark:border-slate-800 focus:ring-emerald-500/20 min-h-[100px]"
            />
          </div>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-xl py-6 shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]">
            Send Message
          </Button>
        </form>
      </div>
    </div>
  );
}
