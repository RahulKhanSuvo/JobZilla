import { useState } from "react";
import { User } from "lucide-react";
import { Section } from "./ui/Section";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store";

export default function GeneralAccount() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("+880 1712 345 678"); // Mock data for phone as it might not be in user object

  return (
    <Section icon={<User className="w-5 h-5" />} title="General Account">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 text-left">
          <label
            htmlFor="recruiter-name"
            className="block text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            Full Name
          </label>
          <Input
            id="recruiter-name"
            type="text"
            value={user?.name || ""}
            readOnly
            className="w-full h-12 px-4 border-slate-200 text-sm text-slate-900 bg-slate-50/50 cursor-not-allowed rounded-lg"
          />
          <p className="text-[10px] text-slate-400 mt-1 italic">
            Name can be changed in profile settings.
          </p>
        </div>
        <div className="space-y-2 text-left">
          <label
            htmlFor="recruiter-email"
            className="block text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            Email Address
          </label>
          <Input
            id="recruiter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-4 border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all"
          />
        </div>
        <div className="space-y-2 text-left">
          <label
            htmlFor="recruiter-phone"
            className="block text-xs font-bold text-slate-500 uppercase tracking-wider"
          >
            Phone Number
          </label>
          <Input
            id="recruiter-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full h-12 px-4 border-slate-200 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg transition-all"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8 pt-6 border-t border-slate-100">
        <button
          className="bg-primary hover:bg-primary/90 text-white text-sm font-bold h-11 px-8 rounded-lg transition-all shadow-sm hover:shadow-md grow sm:grow-0"
          onClick={() => {}}
        >
          Save Changes
        </button>
      </div>
    </Section>
  );
}
