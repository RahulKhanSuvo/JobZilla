import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Linkedin, Twitter, Facebook } from "lucide-react";
import type { CandidateProfileData } from "@/redux/features/auth/auth.type";
import { Link } from "react-router";

import { calculateProfileCompletion } from "@/utils/profileCompletion";

interface ProfileSummaryProps {
  data: CandidateProfileData;
}

const ProfileSummary: FC<ProfileSummaryProps> = ({ data }) => {
  const { percentage } = calculateProfileCompletion(data);
  const candidate = data.candidate;

  return (
    <Card className="overflow-hidden border-none shadow-sm dark:bg-slate-900">
      {/* Background Cover */}
      <div className="h-32 bg-linear-to-r from-primary/80 to-primary w-full relative">
        <div className="absolute inset-0 bg-white/10 dark:bg-black/10" />
      </div>

      <CardContent className="relative pt-0 px-6 pb-6">
        {/* Avatar */}
        <div className="flex justify-between items-end -mt-12 mb-4">
          <Avatar className="size-24 border-4 border-white dark:border-slate-900 shadow-md bg-white">
            <AvatarImage src={candidate?.avatar || ""} alt={data.fullName} />
            <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
              {data.fullName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="hidden sm:flex rounded"
          >
            <Link to={"edit"}>Edit Profile</Link>
          </Button>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-bold tracking-tight">
                {data.fullName}
              </h2>
              <div className="flex items-center gap-2.5">
                <div className="w-24 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-primary">
                  {percentage}% Profile Complete
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {candidate?.location && (
              <Badge
                variant="secondary"
                className="font-normal gap-1.5 px-3 py-1 bg-primary/5 text-primary border-transparent hover:bg-primary/10 transition-colors"
              >
                <MapPin className="size-3.5" />
                {candidate?.location}
              </Badge>
            )}
            {data.email && (
              <Badge
                variant="secondary"
                className="font-normal gap-1.5 px-3 py-1 bg-primary/5 text-primary border-transparent hover:bg-primary/10 transition-colors"
              >
                <Mail className="size-3.5" />
                {data.email}
              </Badge>
            )}
            {candidate?.phone && (
              <Badge
                variant="secondary"
                className="font-normal gap-1.5 px-3 py-1 bg-primary/5 text-primary border-transparent hover:bg-primary/10 transition-colors"
              >
                <Phone className="size-3.5" />
                {candidate?.phone}
              </Badge>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            {candidate?.linkedin && (
              <a
                href={candidate?.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="size-5" />
              </a>
            )}
            {candidate?.twitter && (
              <a
                href={candidate?.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="size-5" />
              </a>
            )}
            {candidate?.facebook && (
              <a
                href={candidate?.facebook}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="size-5" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
