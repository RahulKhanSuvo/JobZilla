/* eslint-disable @typescript-eslint/no-explicit-any */
import CommonWrapper from "@/components/common/CommonWrapper";
import DashboardTitle from "@/components/common/DashboardTitle";
import emptyImage from "@/assets/logos/image-up.jpg";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import SectionTitle from "@/components/common/SectionTitle";
import SkillTagsInput from "@/components/common/SkillTagsInput";
import RichTextEditor from "@/components/common/RichTextEditor";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router";
import { ArrowLeft, Edit2, Loader2, PlusCircle, Trash2 } from "lucide-react";
import {
  useForm,
  useField,
  useStore,
  type FormApi,
} from "@tanstack/react-form";
import { profileSchema, type ProfileFormData } from "../profileSchema";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUserQuery } from "@/redux/features/auth/auth.api";
import { useUpdataCandidateMutation } from "@/redux/features/candidate/candidate.api";
import { errorToast } from "@/utils/errorToast";

// ─── Education item default ────────────────────────────────────────────────────
const emptyEducation = () => ({
  institution: "",
  major: "",
  field: "",
  gap: 0,
  startData: "",
  endData: "",
  isStudying: false,
});

// ─── Experience item default ───────────────────────────────────────────────────
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
    validators: {
      onChange: profileSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      if (selectedFile) {
        formData.append("avatar", selectedFile);
      }
      formData.append("data", JSON.stringify(value));

      try {
        const res = await updateCandidate(formData).unwrap();
        console.log(res);
        toast.success("Profile updated successfully!");
        setPreviewUrl(null);
        setSelectedFile(null);
      } catch (error) {
        errorToast(error);
      }
    },
  });

  // ─── Populate form from server data ─────────────────────────────────────────
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };
  const f = form as FormApi<any, any>;
  const fullNameField = useField({ form: f, name: "fullName" });
  const emailField = useField({ form: f, name: "email" });
  const phoneField = useField({ form: f, name: "phone" });
  const locationField = useField({ form: f, name: "location" });
  const dobField = useField({ form: f, name: "dob" });
  const genderField = useField({ form: f, name: "gender" });
  const maritalStatusField = useField({ form: f, name: "maritalStatus" });
  const languageField = useField({ form: f, name: "language" });
  const skillsField = useField({ form: f, name: "skills" });
  const aboutMeField = useField({ form: f, name: "aboutMe" });
  const facebookField = useField({ form: f, name: "facebook" });
  const linkedinField = useField({ form: f, name: "linkedin" });
  const twitterField = useField({ form: f, name: "twitter" });

  // ─── Dynamic list values ──────────────────────────────────────────────────────
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

  // ─── Education helpers ────────────────────────────────────────────────────────
  const appendEducation = () => {
    form.setFieldValue("educationList", [...educationList, emptyEducation()]);
  };
  const removeEducation = (index: number) => {
    form.setFieldValue(
      "educationList",
      educationList.filter((_, i) => i !== index),
    );
  };
  const setEducationField = (
    index: number,
    key: keyof NonNullable<ProfileFormData["educationList"]>[number],
    value: any,
  ) => {
    const updated = educationList.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    form.setFieldValue("educationList", updated);
  };

  // ─── Experience helpers ───────────────────────────────────────────────────────
  const appendExperience = () => {
    form.setFieldValue("experienceList", [
      ...experienceList,
      emptyExperience(),
    ]);
  };
  const removeExperience = (index: number) => {
    form.setFieldValue(
      "experienceList",
      experienceList.filter((_, i) => i !== index),
    );
  };
  const setExperienceField = (
    index: number,
    key: keyof NonNullable<ProfileFormData["experienceList"]>[number],
    value: any,
  ) => {
    const updated = experienceList.map((item, i) =>
      i === index ? { ...item, [key]: value } : item,
    );
    form.setFieldValue("experienceList", updated);
  };

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
          {/* user photo */}
          <div className="flex gap-4 pb-7 border-b ">
            <div className="size-28 ">
              <img
                src={avatarUrl}
                alt="empty"
                className="size-28 object-cover"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-[14px]">
                  Upload a new avatar
                </h4>
                <p className="text-[12px]">JPG, PNG or GIF (max. 800x400px)</p>
              </div>
              <div>
                <Input
                  className="border rounded-none cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

          {/* user info form */}
          <div className="space-y-6">
            <SectionTitle size={"sm"}>Information</SectionTitle>
            <FieldGroup className="grid grid-cols-2 gap-6">
              <Field data-invalid={!!fullNameField.state.meta.errors.length}>
                <FieldLabel className="font-bold">Full Name</FieldLabel>
                <Input
                  placeholder="Enter your full name"
                  className="h-11"
                  variant="withBg"
                  type="text"
                  value={fullNameField.state.value}
                  onBlur={fullNameField.handleBlur}
                  onChange={(e) => fullNameField.handleChange(e.target.value)}
                  aria-invalid={!!fullNameField.state.meta.errors.length}
                />
                <FieldError errors={fullNameField.state.meta.errors} />
              </Field>
              <Field data-invalid={!!emailField.state.meta.errors.length}>
                <FieldLabel className="font-bold">Email</FieldLabel>
                <Input
                  placeholder="Enter your email address"
                  className="h-11"
                  variant="withBg"
                  type="email"
                  disabled
                  value={emailField.state.value}
                  onBlur={emailField.handleBlur}
                  onChange={(e) => emailField.handleChange(e.target.value)}
                  aria-invalid={!!emailField.state.meta.errors.length}
                />
                <FieldError errors={emailField.state.meta.errors} />
              </Field>
              <Field data-invalid={!!phoneField.state.meta.errors.length}>
                <FieldLabel className="font-bold">Phone</FieldLabel>
                <Input
                  placeholder="Enter your phone number"
                  className="h-11"
                  variant="withBg"
                  type="tel"
                  value={phoneField.state.value}
                  onBlur={phoneField.handleBlur}
                  onChange={(e) => phoneField.handleChange(e.target.value)}
                  aria-invalid={!!phoneField.state.meta.errors.length}
                />
                <FieldError errors={phoneField.state.meta.errors} />
              </Field>
              <Field data-invalid={!!locationField.state.meta.errors.length}>
                <FieldLabel className="font-bold">Location</FieldLabel>
                <Input
                  placeholder="Enter your location"
                  className="h-11"
                  variant="withBg"
                  type="text"
                  value={locationField.state.value}
                  onBlur={locationField.handleBlur}
                  onChange={(e) => locationField.handleChange(e.target.value)}
                  aria-invalid={!!locationField.state.meta.errors.length}
                />
                <FieldError errors={locationField.state.meta.errors} />
              </Field>
              <Field>
                <FieldLabel className="font-bold">Date of Birth</FieldLabel>
                <Input
                  placeholder="Enter your date of birth"
                  className="h-11"
                  variant="withBg"
                  type="date"
                  value={dobField.state.value}
                  onBlur={dobField.handleBlur}
                  onChange={(e) => dobField.handleChange(e.target.value)}
                />
              </Field>
              <Field data-invalid={!!genderField.state.meta.errors.length}>
                <FieldLabel className="font-bold">Gender</FieldLabel>
                <div className="space-y-2 text-left">
                  <Select
                    key={(genderField.state.value as string) || "empty"}
                    onValueChange={(val) =>
                      genderField.handleChange(
                        val as typeof genderField.state.value,
                      )
                    }
                    value={genderField.state.value || undefined}
                  >
                    <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none" position="popper">
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={genderField.state.meta.errors} />
                </div>
              </Field>
              <Field
                data-invalid={!!maritalStatusField.state.meta.errors.length}
              >
                <FieldLabel className="font-bold">Marital Status</FieldLabel>
                <div className="space-y-2 text-left">
                  <Select
                    key={(maritalStatusField.state.value as string) || "empty"}
                    onValueChange={(val) =>
                      maritalStatusField.handleChange(
                        val as typeof maritalStatusField.state.value,
                      )
                    }
                    value={maritalStatusField.state.value || undefined}
                  >
                    <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                      <SelectValue placeholder="Select marital status" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none" position="popper">
                      <SelectItem value="single">Single</SelectItem>
                      <SelectItem value="married">Married</SelectItem>
                      <SelectItem value="divorced">Divorced</SelectItem>
                      <SelectItem value="widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={maritalStatusField.state.meta.errors} />
                </div>
              </Field>
              <Field data-invalid={!!languageField.state.meta.errors.length}>
                <FieldLabel className="font-bold">Language</FieldLabel>
                <div className="space-y-2 text-left">
                  <Select
                    key={(languageField.state.value as string) || "empty"}
                    onValueChange={(val) =>
                      languageField.handleChange(
                        val as typeof languageField.state.value,
                      )
                    }
                    value={languageField.state.value || undefined}
                  >
                    <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                      <SelectValue placeholder="Select your language" />
                    </SelectTrigger>
                    <SelectContent className="rounded-none" position="popper">
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="hindi">Hindi</SelectItem>
                      <SelectItem value="bengali">Bengali</SelectItem>
                    </SelectContent>
                  </Select>
                  <FieldError errors={languageField.state.meta.errors} />
                </div>
              </Field>

              <Field className="col-span-2">
                <FieldLabel className="font-bold">Skills</FieldLabel>
                <SkillTagsInput
                  value={skillsField.state.value ?? []}
                  onChange={(val) => skillsField.handleChange(val)}
                  variant="withBg"
                />
              </Field>
            </FieldGroup>
          </div>

          {/* Education list */}
          <div className="space-y-6 pt-4 border-t">
            <SectionTitle size={"sm"}>Education</SectionTitle>
            <div className="space-y-8">
              {educationList.map((edu, index) => (
                <div key={index} className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-[#F5F5F5] dark:bg-[#222222]">
                    <span className="font-bold">Education {index + 1}</span>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeEducation(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="icon-sm">
                        <Edit2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <FieldGroup className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-2 gap-6">
                      <Field>
                        <FieldLabel className="font-bold">
                          Institution
                        </FieldLabel>
                        <Input
                          placeholder="Fine Arts University"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={edu.institution}
                          onChange={(e) =>
                            setEducationField(
                              index,
                              "institution",
                              e.target.value,
                            )
                          }
                        />
                      </Field>
                      <Field>
                        <FieldLabel className="font-bold">Major</FieldLabel>
                        <Input
                          placeholder="e.g. Computer Science"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={edu.major}
                          onChange={(e) =>
                            setEducationField(index, "major", e.target.value)
                          }
                        />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <Field>
                        <FieldLabel className="font-bold">
                          Field of Study
                        </FieldLabel>
                        <Input
                          placeholder="e.g. Design, Engineering"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={edu.field}
                          onChange={(e) =>
                            setEducationField(index, "field", e.target.value)
                          }
                        />
                      </Field>
                      <Field>
                        <FieldLabel className="font-bold">
                          Gap (years)
                        </FieldLabel>
                        <Input
                          placeholder="0"
                          type="number"
                          min={0}
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={edu.gap ?? 0}
                          onChange={(e) =>
                            setEducationField(
                              index,
                              "gap",
                              Number(e.target.value),
                            )
                          }
                        />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <Field>
                        <FieldLabel className="font-bold">
                          Start Date
                        </FieldLabel>
                        <Input
                          type="date"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={edu.startData}
                          onChange={(e) =>
                            setEducationField(
                              index,
                              "startData",
                              e.target.value,
                            )
                          }
                        />
                      </Field>
                      <Field>
                        <FieldLabel className="font-bold">End Date</FieldLabel>
                        <Input
                          type="date"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={edu.endData}
                          onChange={(e) =>
                            setEducationField(index, "endData", e.target.value)
                          }
                        />
                      </Field>
                    </div>
                    <Field>
                      <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          className="size-4 accent-primary"
                          checked={edu.isStudying ?? false}
                          onChange={(e) =>
                            setEducationField(
                              index,
                              "isStudying",
                              e.target.checked,
                            )
                          }
                        />
                        Currently Studying
                      </label>
                    </Field>
                  </FieldGroup>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-6 border-dashed border-2 hover:bg-slate-50 transition-colors"
                onClick={appendEducation}
              >
                <PlusCircle className="size-5" />
                <span>Add Another Education</span>
              </Button>
            </div>
          </div>

          {/* Experience list */}
          <div className="space-y-6 pt-4 border-t">
            <SectionTitle size={"sm"}>Experience</SectionTitle>
            <div className="space-y-8">
              {experienceList.map((exp, index) => (
                <div key={index} className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-[#F5F5F5] dark:bg-[#222222]">
                    <span className="font-bold">Experience {index + 1}</span>
                    <div className="flex gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => removeExperience(index)}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                      <Button type="button" variant="ghost" size="icon-sm">
                        <Edit2 className="size-4" />
                      </Button>
                    </div>
                  </div>
                  <FieldGroup className="grid grid-cols-1 gap-6">
                    <div className="grid grid-cols-2 gap-6">
                      <Field>
                        <FieldLabel className="font-bold">Job Title</FieldLabel>
                        <Input
                          placeholder="e.g. Software Engineer"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={exp.jobTitle}
                          onChange={(e) =>
                            setExperienceField(
                              index,
                              "jobTitle",
                              e.target.value,
                            )
                          }
                        />
                      </Field>
                      <Field>
                        <FieldLabel className="font-bold">
                          Company Name
                        </FieldLabel>
                        <Input
                          placeholder="Avitex Inc"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={exp.companyName}
                          onChange={(e) =>
                            setExperienceField(
                              index,
                              "companyName",
                              e.target.value,
                            )
                          }
                        />
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel className="font-bold">Industry</FieldLabel>
                      <Input
                        placeholder="e.g. Technology, Finance"
                        className="h-11 border-none shadow-none"
                        variant="withBg"
                        value={exp.industry}
                        onChange={(e) =>
                          setExperienceField(index, "industry", e.target.value)
                        }
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-6">
                      <Field>
                        <FieldLabel className="font-bold">
                          Start Date
                        </FieldLabel>
                        <Input
                          type="date"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={exp.startData}
                          onChange={(e) =>
                            setExperienceField(
                              index,
                              "startData",
                              e.target.value,
                            )
                          }
                        />
                      </Field>
                      <Field>
                        <FieldLabel className="font-bold">End Date</FieldLabel>
                        <Input
                          type="date"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          value={exp.endData}
                          onChange={(e) =>
                            setExperienceField(index, "endData", e.target.value)
                          }
                        />
                      </Field>
                    </div>
                    <Field>
                      <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          className="size-4 accent-primary"
                          checked={exp.isWorking ?? false}
                          onChange={(e) =>
                            setExperienceField(
                              index,
                              "isWorking",
                              e.target.checked,
                            )
                          }
                        />
                        Currently Working Here
                      </label>
                    </Field>
                    <Field>
                      <FieldLabel className="font-bold">Description</FieldLabel>
                      <Textarea
                        placeholder="Write something..."
                        className="min-h-32 border-none shadow-none resize-none bg-[#F5F5F5] dark:bg-[#222222]"
                        value={exp.Description}
                        onChange={(e) =>
                          setExperienceField(
                            index,
                            "Description",
                            e.target.value,
                          )
                        }
                      />
                    </Field>
                  </FieldGroup>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-6 border-dashed border-2 hover:bg-slate-50 transition-colors"
                onClick={appendExperience}
              >
                <PlusCircle className="size-5" />
                <span>Add Another Experience</span>
              </Button>
            </div>
          </div>

          {/* about me */}
          <div className="space-y-4 pt-4 border-t">
            <SectionTitle size={"sm"}>About Me</SectionTitle>
            <RichTextEditor
              value={aboutMeField.state.value || ""}
              onChange={(val) => aboutMeField.handleChange(val)}
              placeholder="Write about yourself..."
            />
          </div>

          {/* social network */}
          <div className="space-y-6 pt-6 border-t">
            <SectionTitle size={"sm"}>Social Network</SectionTitle>
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: FaFacebookF,
                  field: facebookField,
                  label: "Facebook",
                  placeholder: "http://www.facebook.com/avitex",
                },
                {
                  icon: FaLinkedinIn,
                  field: linkedinField,
                  label: "LinkedIn",
                  placeholder: "URL",
                },
                {
                  icon: FaTwitter,
                  field: twitterField,
                  label: "Twitter",
                  placeholder: "URL",
                },
              ].map((item, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center size-10 rounded-full bg-[#F5F5F5] dark:bg-[#222222] shrink-0">
                      <item.icon className="text-[14px]" />
                    </div>
                    <Input
                      placeholder={item.placeholder}
                      className="h-11 border-none shadow-none"
                      variant="withBg"
                      value={item.field.state.value}
                      onBlur={item.field.handleBlur}
                      onChange={(e) => item.field.handleChange(e.target.value)}
                      aria-invalid={!!item.field.state.meta.errors.length}
                    />
                  </div>
                  <FieldError
                    className="ml-14"
                    errors={item.field.state.meta.errors}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <Button type="submit" size="lg" className="w-full md:w-auto px-10">
              Save Profile{" "}
              {isLoading && <Loader2 className="size-4 animate-spin" />}
            </Button>
          </div>
        </form>
      </CommonWrapper>
    </div>
  );
}
