import React, { useState } from "react";
import { Eye } from "lucide-react";
import { Section } from "./ui/Section";
import { Toggle } from "./ui/Toggle";

export default function PrivacyVisibility() {
  const [profileVisible, setProfileVisible] = useState(true);
  const [openToWork, setOpenToWork] = useState(false);

  return (
    <Section icon={<Eye className="w-5 h-5" />} title="Privacy & Visibility">
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-4 p-2">
          <div>
            <p className="text-sm font-medium text-gray-900">
              Profile Visibility
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Control who can find your profile and CV in searches.
            </p>
          </div>
          <Toggle
            id="toggle-profile-visibility"
            checked={profileVisible}
            onChange={setProfileVisible}
          />
        </div>

        <div className="h-px bg-gray-100" />

        <div className="flex items-center justify-between gap-4 p-2">
          <div>
            <p className="text-sm font-medium text-gray-900">
              "Open to Work" Badge
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Show a badge to recruiters indicating you are actively looking.
            </p>
          </div>
          <Toggle
            id="toggle-open-to-work"
            checked={openToWork}
            onChange={setOpenToWork}
          />
        </div>
      </div>
    </Section>
  );
}
