import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Linkedin, Twitter, Facebook } from "lucide-react";
import type { AuthUser } from "@/redux/features/auth/auth.type";
import { Link } from "react-router";

interface ProfileSummaryProps {
  data: AuthUser;
}

const ProfileSummary: FC<ProfileSummaryProps> = ({ data }) => {
  const candidate = data.candidate;

  return (
    <Card className="overflow-hidden border-none shadow bg-white dark:bg-slate-900 relative">
      <div className="h-2 bg-linear-to-r from-primary/40 via-primary to-primary/40 w-full" />

      <CardContent className="pt-8 pb-10 px-8">
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          <div className="relative group">
            <Avatar className="size-32 border-4 border-white dark:border-slate-800 shadow-2xl transition-transform duration-500 group-hover:scale-105">
              <AvatarImage src={candidate?.avatar || ""} alt={data.name} />
              <AvatarFallback className="text-4xl font-black bg-primary/5 text-primary italic">
                {data.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div
              className="absolute -bottom-1 -right-1 size-8 bg-green-500 border-4 border-white dark:border-slate-900 rounded-full shadow-lg"
              title="Available for work"
            />
          </div>

          {/* Core Info */}
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">
                  {data.name}
                </h1>
                <p className="text-primary font-bold text-lg tracking-widest uppercase">
                  {candidate?.preferredCategory || "Professional Candidate"}
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full border-primary/20 hover:bg-primary/5 transition-all active:scale-95 px-6"
              >
                <Link to={"edit"}>Edit Profile</Link>
              </Button>
            </div>

            {/* Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              {candidate?.location && (
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 group">
                  <div className="size-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <MapPin className="size-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">
                    {candidate.location}
                  </span>
                </div>
              )}
              {data.email && (
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 group">
                  <div className="size-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Mail className="size-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{data.email}</span>
                </div>
              )}
              {candidate?.phone && (
                <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-400 group">
                  <div className="size-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Phone className="size-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{candidate.phone}</span>
                </div>
              )}
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              {[
                {
                  icon: Linkedin,
                  url: candidate?.linkedin,
                  color: "hover:text-[#0077B5]",
                },
                {
                  icon: Twitter,
                  url: candidate?.twitter,
                  color: "hover:text-[#1DA1F2]",
                },
                {
                  icon: Facebook,
                  url: candidate?.facebook,
                  color: "hover:text-[#1877F2]",
                },
              ].map(
                (social, idx) =>
                  social.url && (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 transition-all ${social.color} hover:bg-white dark:hover:bg-slate-700 shadow-sm hover:shadow-md`}
                    >
                      <social.icon className="size-5" />
                    </a>
                  ),
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
