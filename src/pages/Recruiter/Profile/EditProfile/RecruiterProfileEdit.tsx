import DashboardTitle from "@/components/common/DashboardTitle";
import { Button } from "@/components/ui/button";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function RecruiterProfileEdit() {
  const navigate = useNavigate();
  const [updateRecruiter, { isLoading }] = useUpdateRecruiterMutation();
  const user = useSelector(selectCurrentUser);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const form = useForm<RecruiterProfileFormData>({
    resolver: zodResolver(recruiterProfileSchema),
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
  });

  useEffect(() => {
    if (user) {
      const userData = user;
      const companyData = userData.company;

      form.reset({
        name: userData.name || "",
        email: userData.email || "",
        phone: companyData?.phone || userData.phone || "",
        website: companyData?.website || "",
        foundedDate: companyData?.foundedDate || "",
        companySize: companyData?.companySize || "",
        showProfile: companyData?.showProfile ?? true,
        industry: companyData?.industry || "",
        description: companyData?.description || "",
        facebook: companyData?.facebook || "",
        linkedin: companyData?.linkedin || "",
        twitter: companyData?.twitter || "",
        address: companyData?.address || "",
        location: companyData?.location || "",
        logo: companyData?.logo || "",
        coverImage: companyData?.coverImage || "",
      });
    }
  }, [user, form]);

  const employerName = useWatch({
    control: form.control,
    name: "name",
  });

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

  const onSubmit = async (data: RecruiterProfileFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
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
  };

  // Derive preview sources: newly uploaded file preview OR the existing URL from the data
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
        <Button
          type="submit"
          form="profile-edit-form"
          className="bg-primary rounded-none text-white font-bold px-8"
        >
          {isLoading ? "Saving..." : "Save Profile"}
        </Button>
      </div>

      <form
        id="profile-edit-form"
        onSubmit={form.handleSubmit(onSubmit)}
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
      </form>
    </div>
  );
}
