import type { FC } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Linkedin, Twitter, Facebook } from "lucide-react";
import type { CandidateProfileData } from "@/redux/features/auth/auth.type";

interface ProfileSummaryProps {
  data: CandidateProfileData;
}

const ProfileSummary: FC<ProfileSummaryProps> = ({ data }) => {
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
            <AvatarImage src={data.profileImage || ""} alt={data.fullName} />
            <AvatarFallback className="text-3xl font-bold bg-primary/10 text-primary">
              {data.fullName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            Edit Profile
          </Button>
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              {data.fullName}
            </h2>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {data.location && (
              <Badge
                variant="secondary"
                className="font-normal gap-1.5 px-3 py-1 bg-primary/5 text-primary border-transparent hover:bg-primary/10 transition-colors"
              >
                <MapPin className="size-3.5" />
                {data.location}
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
            {data.phone && (
              <Badge
                variant="secondary"
                className="font-normal gap-1.5 px-3 py-1 bg-primary/5 text-primary border-transparent hover:bg-primary/10 transition-colors"
              >
                <Phone className="size-3.5" />
                {data.phone}
              </Badge>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            {data.linkedin && (
              <a
                href={data.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="size-5" />
              </a>
            )}
            {data.twitter && (
              <a
                href={data.twitter}
                target="_blank"
                rel="noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="size-5" />
              </a>
            )}
            {data.facebook && (
              <a
                href={data.facebook}
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
