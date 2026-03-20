import {
  MapPin,
  Globe,
  Calendar,
  DollarSign,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  Link2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function JobHeader() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Company Logo & Job Title */}
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-slate-200 dark:border-slate-700 p-2">
            <img
              src="https://ui-avatars.com/api/?name=Senior+UI/UX+Designer&background=00b074&color=fff"
              alt="Company Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
              Senior UI/UX Designer{" "}
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 ml-2">
                Verified
              </span>
            </h1>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-slate-500 dark:text-slate-400 font-medium">
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-emerald-600" />
                Jobszilla New York
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-emerald-600" />
                San Francisco, CA
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Posted 2 days ago
              </span>
            </div>
          </div>
        </div>

        {/* Salary & Share */}
        <div className="flex flex-col items-start md:items-end gap-4">
          <div className="flex items-center gap-2 text-2xl font-bold text-slate-900 dark:text-white">
            <DollarSign className="w-6 h-6 text-emerald-600" />
            <span>$8,000 - $12,000</span>
            <span className="text-sm font-medium text-slate-400">/ Month</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-slate-200 dark:border-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20"
            >
              <Facebook className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-slate-200 dark:border-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20"
            >
              <Twitter className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-slate-200 dark:border-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20"
            >
              <Linkedin className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-slate-200 dark:border-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20"
            >
              <Mail className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-slate-200 dark:border-slate-800 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20"
            >
              <Link2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
