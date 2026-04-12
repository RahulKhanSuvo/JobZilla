import { MapPin, Briefcase, Globe, User as UserIcon } from "lucide-react";
import { Link } from "react-router";
import type { User } from "@/redux/features/auth/auth.type";
import { MdPhoto } from "react-icons/md";

export default function ProfileHader({
  user,
}: {
  user: User | null | undefined;
}) {
  return (
    <div className="overflow-hidden bg-white">
      {/* Cover Photo */}
      <div className="relative h-48 md:h-60 w-full overflow-hidden">
        {user?.company?.coverImage ? (
          <img
            src={user?.company?.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white flex items-center justify-center">
            <span className="text-primary/50">
              <MdPhoto className="size-12" />
            </span>
          </div>
        )}
        {/* Subtle dark gradient overlay at bottom for contrast */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Profile Info Row */}
      <div className="px-6 py-5 relative z-50 bg-white">
        {/* Avatar — overlaps the cover photo */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div className="flex items-end gap-5">
            <div className="-mt-12 md:-mt-14 shrink-0">
              <div className="size-24 md:size-28 overflow-hidden">
                {user?.company?.logo ? (
                  <img
                    src={user?.company?.logo}
                    alt="ABC Tech"
                    className="size-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white flex items-center justify-center">
                    <span className="text-primary/50">
                      <UserIcon className="size-12" />
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Name & meta */}
            <div className="pb-1 space-y-1">
              <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight">
                {user?.name}
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-sm">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5 text-primary" />
                  {user?.company?.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase className="size-3.5 text-primary" />
                  {user?.company?.industry}
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="size-3.5 text-primary" />
                  {user?.company?.website}
                </span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="md:pb-1">
            <Link
              to={"edit"}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow active:scale-95 rounded-lg text-sm"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
