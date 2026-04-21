import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "../profileSchema";
import { Form } from "@/components/ui/form";
import { useUpdataCandidateMutation } from "@/redux/features/candidate/candidate.api";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Save } from "lucide-react";

// Modular Sections
import ProfileProgress from "./components/ProfileProgress";
import PersonalDetails from "./components/PersonalDetails";
import ProfessionalInfo from "./components/ProfessionalInfo";
import EducationSection from "./components/EducationSection";
import ExperienceSection from "./components/ExperienceSection";
import SocialLinks from "./components/SocialLinks";
import DashboardTitle from "@/components/common/DashboardTitle";
import type {
  Skill,
  Education,
  WorkExperience,
  CandidateProfile,
  AuthUser,
} from "@/redux/features/auth/auth.type";
import { errorToast } from "@/utils/errorToast";
import { useCurrentUserQuery } from "@/redux/features/auth/auth.api";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const { data, isLoading } = useCurrentUserQuery();
  const [updateCandidate, { isLoading: isUpdating }] =
    useUpdataCandidateMutation();
  const user = data?.data;
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      dob: "",
      gender: "Male",
      maritalStatus: "Single",
      preferredJobType: "FULL_TIME",
      preferredCareerLevel: "ENTRY_LEVEL",
      preferredCategory: "TECHNOLOGY",
      aboutMe: "",
      skills: [],
      language: [],
      educationList: [],
      experienceList: [],
      facebook: "",
      linkedin: "",
      github: "",
    },
    mode: "onChange",
  });

  // Pre-load data from user object
  useEffect(() => {
    if (user) {
      const candidate = user.candidate as unknown as CandidateProfile;
      form.reset({
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || candidate?.phone || "",
        location: candidate?.location || "",
        dob: candidate?.dob
          ? new Date(candidate.dob).toISOString().split("T")[0]
          : "",
        gender: (candidate?.gender as "Male" | "Female" | "Other") || "Male",
        maritalStatus: candidate?.maritalStatus || "Single",
        preferredJobType:
          (candidate?.preferredJobType as
            | "FULL_TIME"
            | "PART_TIME"
            | "REMOTE"
            | "HYBRID") || "FULL_TIME",
        preferredCareerLevel:
          (candidate?.preferredCareerLevel as
            | "ENTRY_LEVEL"
            | "MID_LEVEL"
            | "SENIOR_LEVEL"
            | "EXECUTIVE_LEVEL") || "ENTRY_LEVEL",
        preferredCategory: candidate?.preferredCategory || "TECHNOLOGY",
        aboutMe: candidate?.aboutMe || "",
        skills: Array.isArray(user?.skills)
          ? (user.skills as (string | Skill)[]).map((s) =>
              typeof s === "string" ? s : s.skill || s.id || "",
            )
          : [],
        language: Array.isArray(user?.languages)
          ? user.languages.map((l) =>
              typeof l === "string" ? l : l.language || "",
            )
          : [],
        educationList: Array.isArray(user?.eductions)
          ? user.eductions.map((e: Education) => ({
              institution: e.institution,
              major: e.major,
              field: e.field,
              startData: e.startData
                ? new Date(e.startData).toISOString().split("T")[0]
                : "",
              endData: e.endData
                ? new Date(e.endData).toISOString().split("T")[0]
                : "",
              isStudying: e.isStudying || false,
            }))
          : [],
        experienceList: Array.isArray(user?.workExperiences)
          ? user.workExperiences.map((ex: WorkExperience) => ({
              jobTitle: ex.jobTitle,
              companyName: ex.companyName,
              industry: ex.industry,
              startData: ex.startData
                ? new Date(ex.startData).toISOString().split("T")[0]
                : "",
              endData: ex.endData
                ? new Date(ex.endData).toISOString().split("T")[0]
                : "",
              isWorking: ex.isWorking || false,
              Description: ex.Description || "",
            }))
          : [],
        facebook: candidate?.facebook || "",
        linkedin: candidate?.linkedin || "",
        github: candidate?.github || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (values: ProfileFormData) => {
    try {
      const formData = new FormData();

      // Separate avatar from other data
      const { avatar, ...otherData } = values;

      // Append data as JSON string (following the server's FromParse middleware pattern)
      formData.append("data", JSON.stringify(otherData));

      // Append avatar if it's a File
      if (avatar instanceof File) {
        formData.append("avatar", avatar);
      }

      await updateCandidate(formData).unwrap();
      toast.success("Profile updated successfully!");
      navigate("/candidate/profile");
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50/50 pb-20">
      <Form {...form}>
        <ProfileProgress />

        <div className="space-y-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="rounded-full hover:bg-white shadow-sm"
              >
                <ArrowLeft size={20} />
              </Button>
              <DashboardTitle>Edit My Profile</DashboardTitle>
            </div>
            <Button
              onClick={form.handleSubmit(onSubmit)}
              disabled={isLoading}
              className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              {isLoading ? (
                "Saving..."
              ) : (
                <>
                  <Save size={18} />
                  Save Profile
                </>
              )}
            </Button>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            <PersonalDetails user={user as AuthUser} />
            <ProfessionalInfo />
            <EducationSection />
            <ExperienceSection />
            <SocialLinks />
            <div className="flex justify-end pt-6">
              <Button
                type="submit"
                disabled={isUpdating}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-black text-lg px-12 py-6 rounded-xl shadow-xl shadow-primary/20 transition-all active:scale-95"
              >
                {isUpdating ? (
                  "Updating Profile..."
                ) : (
                  <>
                    <Save size={20} />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
}
