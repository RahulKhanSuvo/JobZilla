import DashboardTitle from "@/components/common/DashboardTitle";
import { Button } from "@/components/ui/button";
import { useForm, useStore } from "@tanstack/react-form";
import {
  recruiterProfileSchema,
  type RecruiterProfileFormData,
} from "../recruiterProfileSchema";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import InformationSection from "./components/InformationSection";
import AboutCompanySection from "./components/AboutCompanySection";
import SocialNetworkSection from "./components/SocialNetworkSection";
import ContactInformationSection from "./components/ContactInformationSection";
import CoverImage from "./components/CoverImage";
import { useUpdateRecruiterMutation } from "@/redux/features/recruiter/recruiter.api";
import { errorToast } from "@/utils/errorToast";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useSelector } from "react-redux";
import type { ZodValidator } from "@tanstack/zod-form-adapter";

export default function RecruiterProfileEdit() {
  const navigate = useNavigate();
  const [updateRecruiter, { isLoading }] = useUpdateRecruiterMutation();
  const user = useSelector(selectCurrentUser);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const form = useForm<RecruiterProfileFormData, ZodValidator>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      website: "",
      foundedDate: "",
      companySize: "",
      showProfile: true,
      industry: "",
      description: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      address: "",
      location: "",
      logo: "",
      coverImage: "",
    },
    validators: {
      onChange: recruiterProfileSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const formData = new FormData();
        Object.entries(value).forEach(([key, value]) => {
          if (
            key !== "logo" &&
            key !== "coverImage" &&
            value !== undefined &&
            value !== null
          ) {
            formData.append(key, String(value));
          }
        });

        // Append files if selected
        if (logoFile) {
          formData.append("logo", logoFile);
        }
        if (coverFile) {
          formData.append("coverImage", coverFile);
        }

        const result = await updateRecruiter(formData).unwrap();
        console.log(result);
        toast.success("Profile updated successfully!");
        navigate("/recruiter/profile");
      } catch (error) {
        errorToast(error);
      }
    },
  });

  useEffect(() => {
    if (user) {
      const userData = user;
      const companyData = userData.company;

      form.setFieldValue("name", userData.name || "");
      form.setFieldValue("email", userData.email || "");
      form.setFieldValue("phone", companyData?.phone || userData.phone || "");
      form.setFieldValue("website", companyData?.website || "");
      form.setFieldValue("foundedDate", companyData?.foundedDate || "");
      form.setFieldValue("companySize", companyData?.companySize || "");
      form.setFieldValue("showProfile", companyData?.showProfile ?? true);
      form.setFieldValue("industry", companyData?.industry || "");
      form.setFieldValue("description", companyData?.description || "");
      form.setFieldValue("facebook", companyData?.facebook || "");
      form.setFieldValue("linkedin", companyData?.linkedin || "");
      form.setFieldValue("twitter", companyData?.twitter || "");
      form.setFieldValue("address", companyData?.address || "");
      form.setFieldValue("location", companyData?.location || "");
      form.setFieldValue("logo", companyData?.logo || "");
      form.setFieldValue("coverImage", companyData?.coverImage || "");
    }
  }, [user, form]);

  const employerName = useStore(form.store, (state) => state.values.name);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setLogoFile(file);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverPreview(URL.createObjectURL(file));
      setCoverFile(file);
    }
  };

  const currentLogoPreview = logoPreview || user?.company?.logo || null;
  const currentCoverPreview = coverPreview || user?.company?.coverImage || null;

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
      </div>

      <form
        id="profile-edit-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <CoverImage
          coverPreview={currentCoverPreview}
          logoPreview={currentLogoPreview}
          handleCoverChange={handleCoverChange}
          handleLogoChange={handleLogoChange}
          employerName={employerName}
        />
        <InformationSection form={form} />
        <AboutCompanySection form={form} />
        <SocialNetworkSection form={form} />
        <ContactInformationSection form={form} />
        <div className="flex justify-end">
          {" "}
          <Button
            type="submit"
            form="profile-edit-form"
            className="bg-primary rounded-none text-white font-bold px-8"
          >
            {isLoading ? "Saving..." : "Save Profile"}
          </Button>
        </div>
      </form>
    </div>
  );
}
