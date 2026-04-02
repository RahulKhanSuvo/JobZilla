import DashboardTitle from "@/components/common/DashboardTitle";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  recruiterProfileSchema,
  type RecruiterProfileFormData,
} from "../recruiterProfileSchema";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import InformationSection from "./components/InformationSection";
import AboutCompanySection from "./components/AboutCompanySection";
import SocialNetworkSection from "./components/SocialNetworkSection";
import ContactInformationSection from "./components/ContactInformationSection";
import CoverImage from "./components/CoverImage";

export default function RecruiterProfileEdit() {
  const navigate = useNavigate();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const form = useForm<RecruiterProfileFormData>({
    resolver: zodResolver(recruiterProfileSchema),
    defaultValues: {
      employerName: "",
      email: "",
      phone: "",
      website: "",
      foundedDate: "",
      companySize: "",
      showProfile: "show",
      categories: [],
      profileUrl: "",
      aboutCompany: "",
      introVideo: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      address: "",
      location: "",
      mapLocation: "",
    },
  });

  const employerName = useWatch({
    control: form.control,
    name: "employerName",
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: RecruiterProfileFormData) => {
    console.log("Recruiter Profile Data:", data);
    toast.success("Profile updated successfully!");
    navigate("/recruiter/profile");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ArrowLeft className="size-4" />
          </Button>
          <DashboardTitle>Profile Setting</DashboardTitle>
        </div>
        <Button
          type="submit"
          form="profile-edit-form"
          className="bg-primary rounded-none text-white font-bold px-8"
        >
          Save Profile
        </Button>
      </div>

      <form
        id="profile-edit-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <CoverImage
          coverPreview={coverPreview}
          logoPreview={logoPreview}
          handleCoverChange={handleCoverChange}
          handleLogoChange={handleLogoChange}
          employerName={employerName}
        />
        <InformationSection form={form} />
        <AboutCompanySection form={form} />
        <SocialNetworkSection form={form} />
        <ContactInformationSection form={form} />
      </form>
    </div>
  );
}
