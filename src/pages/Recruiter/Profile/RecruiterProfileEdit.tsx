import CommonWrapper from "@/components/common/CommonWrapper";
import DashboardTitle from "@/components/common/DashboardTitle";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  recruiterProfileSchema,
  type RecruiterProfileFormData,
} from "./recruiterProfileSchema";
import { toast } from "sonner";
import { useState } from "react";
import { Image as ImageIcon, ArrowLeft, Camera } from "lucide-react";
import { useNavigate } from "react-router";
import InformationSection from "./components/InformationSection";
import AboutCompanySection from "./components/AboutCompanySection";
import SocialNetworkSection from "./components/SocialNetworkSection";
import ContactInformationSection from "./components/ContactInformationSection";

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
      pinterest: "",
      instagram: "",
      youtube: "",
      address: "",
      location: "",
      mapLocation: "",
      gallery: [],
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
        <CommonWrapper className="p-0 overflow-hidden">
          <div className="relative">
            {/* Cover Upload Container */}
            <div className="group relative h-48 md:h-64 w-full bg-slate-100 border-b border-border transition-all">
              {coverPreview ? (
                <img
                  src={coverPreview}
                  alt="Cover"
                  className="size-full object-cover"
                />
              ) : (
                <div className="size-full flex items-center justify-center">
                  <ImageIcon className="size-12 text-muted-foreground/30" />
                </div>
              )}

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

              <Button
                type="button"
                variant="secondary"
                size="sm"
                onClick={() => document.getElementById("cover-upload")?.click()}
                className="absolute bottom-4 right-4 gap-2 shadow rounded bg-white hover:bg-slate-50 text-slate-900 border-none"
              >
                <Camera className="size-4" />
                <span className="hidden sm:inline">Edit Cover Photo</span>
              </Button>
              <input
                id="cover-upload"
                type="file"
                accept="image/*"
                onChange={handleCoverChange}
                className="hidden"
              />
            </div>

            {/* Logo Upload Container (Overlapping) */}
            <div className="px-8 pb-4">
              <div className="relative -mt-16 sm:-mt-20 flex flex-col items-start gap-4">
                <div className="group relative size-28 sm:size-36 rounded overflow-hidden border-4 border-white shadow bg-white shrink-0">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo"
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="size-full flex items-center justify-center bg-slate-50">
                      <ImageIcon className="size-10 text-muted-foreground/30" />
                    </div>
                  )}

                  {/* Logo Edit Overlay */}
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("logo-upload")?.click()
                    }
                    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <div className="size-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/40">
                      <Camera className="size-5" />
                    </div>
                  </button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                </div>

                <div className="flex-1 space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">
                    {employerName || "Company Name"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG or JPEG. Max size 2MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CommonWrapper>
        <InformationSection form={form} />
        <AboutCompanySection form={form} />
        <SocialNetworkSection form={form} />
        <ContactInformationSection form={form} />
      </form>
    </div>
  );
}
