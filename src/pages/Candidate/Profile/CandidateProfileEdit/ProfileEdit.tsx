/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonWrapper from "@/components/common/CommonWrapper";
import DashboardTitle from "@/components/common/DashboardTitle";
import emptyImage from "@/assets/logos/image-up.jpg";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Loader2 } from "lucide-react";
import {
  useForm,
  useField,
  useStore,
  type FormApi,
} from "@tanstack/react-form";
import { profileSchema, type ProfileFormData } from "../profileSchema";
import { toast } from "sonner";
import { useCurrentUserQuery } from "@/redux/features/auth/auth.api";
import { useUpdataCandidateMutation } from "@/redux/features/candidate/candidate.api";
import { errorToast } from "@/utils/errorToast";

// ─── Section components ────────────────────────────────────────────────────────
import AvatarUpload from "./components/AvatarUpload";
import PersonalInfoSection from "./components/PersonalInfoSection";
import EducationList from "./components/EducationList";
import ExperienceList from "./components/ExperienceList";
import AboutMeSection from "./components/AboutMeSection";
import SocialLinksSection from "./components/SocialLinksSection";
import EditProfileCompletenessBar from "./components/EditProfileCompletenessBar";

// ─── Defaults ─────────────────────────────────────────────────────────────────
const emptyEducation = () => ({
  institution: "",
  major: "",
  field: "",
  startData: "",
  endData: "",
  isStudying: false,
});

const emptyExperience = () => ({
  jobTitle: "",
  companyName: "",
  industry: "",
  startData: "",
  endData: "",
  isWorking: false,
  Description: "",
});

export default function ProfileEdit() {
  const { data: userData } = useCurrentUserQuery();
  const [updateCandidate, { isLoading }] = useUpdataCandidateMutation();
  const navigate = useNavigate();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const candidate = (userData?.data as any)?.candidate || {};
  const avatarUrl = previewUrl || candidate.profileImage || emptyImage;

  // ─── Form setup ───────────────────────────────────────────────────────────
  const form = useForm<ProfileFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      dob: "",
      gender: undefined,
      maritalStatus: "",
      language: undefined,
      skills: [],
      aboutMe: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      educationList: [emptyEducation()],
      experienceList: [emptyExperience()],
    },
    validators: { onChange: profileSchema },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      if (selectedFile) formData.append("avatar", selectedFile);
      formData.append("data", JSON.stringify(value));
      try {
        await updateCandidate(formData).unwrap();
        toast.success("Profile updated successfully!");
        setPreviewUrl(null);
        setSelectedFile(null);
      } catch (error) {
        errorToast(error);
      }
    },
  });
  useEffect(() => {
    if (userData?.data) {
      const data = userData.data as any;
      const c = data.candidate || {};

      form.setFieldValue("fullName", data.name || "");
      form.setFieldValue("email", data.email || "");
      form.setFieldValue("phone", c.phone || "");
      form.setFieldValue("location", c.location || "");
      form.setFieldValue(
        "dob",
        c.dob ? new Date(c.dob).toISOString().split("T")[0] : "",
      );
      form.setFieldValue("careerFinding", c.careerFinding || "");
      form.setFieldValue("gender", c.gender || null);
      form.setFieldValue("maritalStatus", c.maritalStatus || "");
      form.setFieldValue("language", c.language || null);
      form.setFieldValue(
        "skills",
        c.skills?.length
          ? c.skills
              .map((s: any) => (typeof s === "string" ? s : s.skill))
              .filter(Boolean)
          : [],
      );
      form.setFieldValue("aboutMe", c.aboutMe || "");
      form.setFieldValue("facebook", c.facebook || "");
      form.setFieldValue("linkedin", c.linkedin || "");
      form.setFieldValue("twitter", c.twitter || "");
      form.setFieldValue(
        "educationList",
        c.eductions?.length
          ? c.eductions.map((e: any) => ({
              ...e,
              startData: e.startData
                ? new Date(e.startData).toISOString().split("T")[0]
                : "",
              endData: e.endData
                ? new Date(e.endData).toISOString().split("T")[0]
                : "",
              gap: Number(e.gap) || 0,
            }))
          : [emptyEducation()],
      );
      form.setFieldValue(
        "experienceList",
        c.workExperiences?.length
          ? c.workExperiences.map((e: any) => ({
              ...e,
              startData: e.startData
                ? new Date(e.startData).toISOString().split("T")[0]
                : "",
              endData: e.endData
                ? new Date(e.endData).toISOString().split("T")[0]
                : "",
            }))
          : [emptyExperience()],
      );
    }
  }, [userData, form]);

  // ─── Image handler ────────────────────────────────────────────────────────
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // ─── Field hooks (only aboutMe needs useField; others use formValues) ────────
  const f = form as FormApi<any, any>;
  const aboutMeField = useField({ form: f, name: "aboutMe" });

  // ─── Dynamic list values ──────────────────────────────────────────────────
  const educationList = useStore(
    form.store,
    (s) =>
      (s.values.educationList ?? [emptyEducation()]) as NonNullable<
        ProfileFormData["educationList"]
      >,
  );
  const experienceList = useStore(
    form.store,
    (s) =>
      (s.values.experienceList ?? [emptyExperience()]) as NonNullable<
        ProfileFormData["experienceList"]
      >,
  );

  // ─── Education helpers ────────────────────────────────────────────────────
  const appendEducation = () =>
    form.setFieldValue("educationList", [...educationList, emptyEducation()]);

  const removeEducation = (index: number) =>
    form.setFieldValue(
      "educationList",
      educationList.filter((_, i) => i !== index),
    );

  const setEducationField = (
    index: number,
    key: keyof NonNullable<ProfileFormData["educationList"]>[number],
    value: string | number | boolean,
  ) => {
    form.setFieldValue(
      "educationList",
      educationList.map((item, i) =>
        i === index ? { ...item, [key]: value } : item,
      ),
    );
  };

  // ─── Experience helpers ───────────────────────────────────────────────────
  const appendExperience = () =>
    form.setFieldValue("experienceList", [
      ...experienceList,
      emptyExperience(),
    ]);

  const removeExperience = (index: number) =>
    form.setFieldValue(
      "experienceList",
      experienceList.filter((_, i) => i !== index),
    );

  const setExperienceField = (
    index: number,
    key: keyof NonNullable<ProfileFormData["experienceList"]>[number],
    value: string | boolean,
  ) => {
    form.setFieldValue(
      "experienceList",
      experienceList.map((item, i) =>
        i === index ? { ...item, [key]: value } : item,
      ),
    );
  };

  // ─── Completeness checks (live) ──────────────────────────────────────────────
  const formValues = useStore(form.store, (s) => s.values);
  // Validation errors keyed by field name
  const fieldErrors = useStore(form.store, (s) => {
    const meta = s.fieldMeta as Record<
      string,
      { errors?: string[] } | undefined
    >;
    return {
      fullName: meta.fullName?.errors ?? [],
      email: meta.email?.errors ?? [],
      phone: meta.phone?.errors ?? [],
      location: meta.location?.errors ?? [],
      gender: meta.gender?.errors ?? [],
      maritalStatus: meta.maritalStatus?.errors ?? [],
      language: meta.language?.errors ?? [],
      facebook: meta.facebook?.errors ?? [],
      linkedin: meta.linkedin?.errors ?? [],
      twitter: meta.twitter?.errors ?? [],
    };
  });
  const completenessChecks = [
    {
      label: "Basic Info",
      completed: !!(
        formValues.fullName &&
        formValues.phone &&
        formValues.location
      ),
    },
    { label: "About Me", completed: !!formValues.aboutMe },
    {
      label: "Skills",
      completed: (formValues.skills?.length ?? 0) > 0,
    },
    {
      label: "Education",
      completed: (formValues.educationList ?? []).some((e) => !!e.institution),
    },
    {
      label: "Experience",
      completed: (formValues.experienceList ?? []).some((e) => !!e.jobTitle),
    },
    {
      label: "Social Links",
      completed: !!(
        formValues.facebook ||
        formValues.linkedin ||
        formValues.twitter
      ),
    },
  ];

  // ─── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => navigate(-1)}
          className="rounded-full bg-white dark:bg-input/30"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <DashboardTitle>Profile Edit</DashboardTitle>
      </div>

      <CommonWrapper className="p-7">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-8"
        >
          <EditProfileCompletenessBar checks={completenessChecks} />

          <AvatarUpload
            avatarUrl={avatarUrl}
            onFileChange={handleImageChange}
          />

          <PersonalInfoSection
            values={{
              fullName: formValues.fullName ?? "",
              email: formValues.email ?? "",
              phone: formValues.phone ?? "",
              location: formValues.location ?? "",
              dob: formValues.dob ?? "",
              gender: formValues.gender,
              maritalStatus: formValues.maritalStatus,
              language: formValues.language,
              skills: formValues.skills ?? [],
            }}
            errors={fieldErrors}
            onChange={(field, value) => form.setFieldValue(field as any, value)}
          />

          <EducationList
            educationList={educationList}
            appendEducation={appendEducation}
            removeEducation={removeEducation}
            setEducationField={setEducationField}
          />

          <ExperienceList
            experienceList={experienceList}
            appendExperience={appendExperience}
            removeExperience={removeExperience}
            setExperienceField={setExperienceField}
          />

          <AboutMeSection
            value={aboutMeField.state.value || ""}
            onChange={(val) => aboutMeField.handleChange(val)}
          />

          <SocialLinksSection
            facebook={formValues.facebook ?? ""}
            linkedin={formValues.linkedin ?? ""}
            twitter={formValues.twitter ?? ""}
            errors={fieldErrors}
            onChange={(field, value) => form.setFieldValue(field as any, value)}
          />

          <div className="pt-6 flex justify-end">
            <Button type="submit" size="lg" className="w-full md:w-auto px-10">
              Save Profile{" "}
              {isLoading && <Loader2 className="size-4 animate-spin ml-2" />}
            </Button>
          </div>
        </form>
      </CommonWrapper>
    </div>
  );
}
