import { X, MapPin, Briefcase, ExternalLink } from "lucide-react";
import type { User as UserType } from "../types";
import { Link } from "react-router";

interface ProfileDetailsProps {
  user: UserType;
  onClose: () => void;
}

export default function ProfileDetails({ user, onClose }: ProfileDetailsProps) {
  const profileLink =
    user.role === "Recruiter"
      ? `/candidate/followed-companies/${user.id}` // Dynamic link based on role
      : `/recruiter/applicants/${user.id}`;

  return (
    <div className="w-full max-w-xs md:w-80 h-full bg-white border-l border-gray-200 flex flex-col animate-in slide-in-from-right duration-300">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <h2 className="font-semibold text-gray-900">Contact Info</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 mb-4 shadow-sm">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
          <p className="text-primary font-medium text-sm mt-1">{user.role}</p>

          <div className="mt-6 w-full space-y-4">
            <Link
              to={profileLink}
              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-sm font-medium text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              View Full Profile
            </Link>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 space-y-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Location
              </p>
              <p className="text-sm text-gray-900">
                {user.location || "Not specified"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-green-50 rounded-lg text-green-600">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                Industry
              </p>
              <p className="text-sm text-gray-900">Technology & Software</p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">About</h4>
          <p className="text-sm text-gray-600 leading-relaxed">
            {user.about ||
              `Passionate about connecting talent with opportunities. Feel free to reach out for a quick chat!`}
          </p>
        </div>
      </div>
    </div>
  );
}
