import CommonWrapper from "@/components/common/CommonWrapper";
import demoImage from "@assets/logos/profile-1.jpg";
import { MapPin } from "lucide-react";
import { Link } from "react-router";
export default function ProfileHader() {
  return (
    <CommonWrapper className="flex flex-col md:flex-row items-center justify-between gap-6 p-6">
      <div className="flex items-center gap-5">
        <div className="size-20 overflow-hidden shrink-0">
          <img
            src={demoImage}
            alt="ABC Tech"
            className="size-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-foreground">ABC Tech</h3>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="size-4 text-primary" />
            <p className="text-sm font-medium">Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>
      <Link
        to={"edit"}
        className="inline-flex items-center justify-center px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-sm active:scale-95"
      >
        Edit Profile
      </Link>
    </CommonWrapper>
  );
}
