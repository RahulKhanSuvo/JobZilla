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
import { ArrowLeft, Edit2, PlusCircle, Trash2 } from "lucide-react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "./profileSchema";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUserQuery } from "@/redux/features/auth/auth.api";
import { useUpdataCandidateMutation } from "@/redux/features/candidate/candidate.api";
import { errorToast } from "@/utils/errorToast";

export default function ProfileEdit() {
  const { data: userData } = useCurrentUserQuery();
  const [updateCandidate] = useUpdataCandidateMutation();

  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const candidate = (userData?.data as any)?.candidate || {};
  const avatarUrl = previewUrl || candidate.avatar || emptyImage;

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
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
      educationList: [
        {
          institution: "",
          major: "",
          field: "",
          gap: 0,
          startData: "",
          endData: "",
          isStudying: false,
        },
      ],
      experienceList: [
        {
          jobTitle: "",
          companyName: "",
          industry: "",
          startData: "",
          endData: "",
          isWorking: false,
          Description: "",
        },
      ],
    },
  });

  useEffect(() => {
    if (userData?.data) {
      const data = userData.data as any;
      const email = data.email || "";
      const candidate = data.candidate || {};

      form.reset({
        fullName: data.name || "",
        email: email,
        phone: candidate.phone || "",
        location: candidate.location || "",
        dob: candidate.dob || "",
        gender: candidate.gender || null,
        maritalStatus: candidate.maritalStatus || "",
        language: candidate.language || null,
        skills: candidate.skills?.length
          ? candidate.skills
              .map((s: any) => (typeof s === "string" ? s : s.skill))
              .filter(Boolean)
          : [],
        aboutMe: candidate.aboutMe || "",
        facebook: candidate.facebook || "",
        linkedin: candidate.linkedin || "",
        twitter: candidate.twitter || "",
        educationList: candidate.eductions?.length
          ? candidate.eductions.map((e: any) => ({
              ...e,
              startData: e.startData
                ? new Date(e.startData).toISOString().split("T")[0]
                : "",
              endData: e.endData
                ? new Date(e.endData).toISOString().split("T")[0]
                : "",
              gap: Number(e.gap) || 0,
            }))
          : [
              {
                institution: "",
                major: "",
                field: "",
                gap: 0,
                startData: "",
                endData: "",
                isStudying: false,
              },
            ],
        experienceList: candidate.workExperiences?.length
          ? candidate.workExperiences.map((e: any) => ({
              ...e,
              startData: e.startData
                ? new Date(e.startData).toISOString().split("T")[0]
                : "",
              endData: e.endData
                ? new Date(e.endData).toISOString().split("T")[0]
                : "",
            }))
          : [
              {
                jobTitle: "",
                companyName: "",
                industry: "",
                startData: "",
                endData: "",
                isWorking: false,
                Description: "",
              },
            ],
      });
    }
  }, [userData, form]);

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "educationList",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experienceList",
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    console.log("Form Data:", data);

    const formData = new FormData();
    if (selectedFile) {
      formData.append("avatar", selectedFile);
    }

    formData.append("data", JSON.stringify(data));

    try {
      const res = await updateCandidate(formData).unwrap();
      console.log(res);
      toast.success("Profile updated successfully!");
      setPreviewUrl(null);
      setSelectedFile(null);
    } catch (error) {
      errorToast(error);
    }
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* user photo*/}
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

          {/* usr info form */}
          <div className="space-y-6">
            <SectionTitle size={"sm"}>Information</SectionTitle>
            <FieldGroup className="grid grid-cols-2 gap-6">
              <Field>
                <FieldLabel className="font-bold">Full Name</FieldLabel>
                <Input
                  placeholder="Enter your full name"
                  className="h-11"
                  variant="withBg"
                  type="text"
                  {...form.register("fullName")}
                  aria-invalid={!!form.formState.errors.fullName}
                />
                {form.formState.errors.fullName && (
                  <FieldError errors={[form.formState.errors.fullName]} />
                )}
              </Field>
              <Field>
                <FieldLabel className="font-bold">Email</FieldLabel>
                <Input
                  placeholder="Enter your email address"
                  className="h-11"
                  variant="withBg"
                  type="email"
                  disabled
                  {...form.register("email")}
                  aria-invalid={!!form.formState.errors.email}
                />
                {form.formState.errors.email && (
                  <FieldError errors={[form.formState.errors.email]} />
                )}
              </Field>
              <Field>
                <FieldLabel className="font-bold">Phone</FieldLabel>
                <Input
                  placeholder="Enter your phone number"
                  className="h-11"
                  variant="withBg"
                  type="tel"
                  {...form.register("phone")}
                  aria-invalid={!!form.formState.errors.phone}
                />
                {form.formState.errors.phone && (
                  <FieldError errors={[form.formState.errors.phone]} />
                )}
              </Field>
              <Field>
                <FieldLabel className="font-bold">Location</FieldLabel>
                <Input
                  placeholder="Enter your location"
                  className="h-11"
                  variant="withBg"
                  type="text"
                  {...form.register("location")}
                  aria-invalid={!!form.formState.errors.location}
                />
                {form.formState.errors.location && (
                  <FieldError errors={[form.formState.errors.location]} />
                )}
              </Field>
              <Field>
                <FieldLabel className="font-bold">Date of Birth</FieldLabel>
                <Input
                  placeholder="Enter your date of birth"
                  className="h-11"
                  variant="withBg"
                  type="date"
                  {...form.register("dob")}
                />
              </Field>
              <Field>
                <FieldLabel className="font-bold">Gender</FieldLabel>
                <Controller
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                        <SelectValue className="" placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none" position="popper">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              <Field>
                <FieldLabel className="font-bold">Marital Status</FieldLabel>
                <Input
                  placeholder="Enter your marital status"
                  className="h-11"
                  variant="withBg"
                  type="text"
                  {...form.register("maritalStatus")}
                />
              </Field>
              <Field>
                <FieldLabel className="font-bold">Language</FieldLabel>
                <Controller
                  name="language"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                        <SelectValue
                          className=""
                          placeholder="Select your language"
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-none" position="popper">
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="bengali">Bengali</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field className="col-span-2">
                <FieldLabel className="font-bold">Skills</FieldLabel>
                <Controller
                  name="skills"
                  control={form.control}
                  render={({ field }) => (
                    <SkillTagsInput
                      value={field.value}
                      onChange={field.onChange}
                      variant="withBg"
                    />
                  )}
                />
              </Field>
            </FieldGroup>
          </div>

          {/* Education list */}
          <div className="space-y-6 pt-4 border-t">
            <SectionTitle size={"sm"}>Education</SectionTitle>
            <div className="space-y-8">
              {educationFields.map((field, index) => (
                <div key={field.id} className="space-y-6">
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
                          {...form.register(
                            `educationList.${index}.institution`,
                          )}
                        />
                      </Field>
                      <Field>
                        <FieldLabel className="font-bold">Major</FieldLabel>
                        <Input
                          placeholder="e.g. Computer Science"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          {...form.register(`educationList.${index}.major`)}
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
                          {...form.register(`educationList.${index}.field`)}
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
                          {...form.register(`educationList.${index}.gap`, {
                            valueAsNumber: true,
                          })}
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
                          {...form.register(`educationList.${index}.startData`)}
                        />
                      </Field>
                      <Field>
                        <FieldLabel className="font-bold">End Date</FieldLabel>
                        <Input
                          type="date"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          {...form.register(`educationList.${index}.endData`)}
                        />
                      </Field>
                    </div>
                    <Field>
                      <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          className="size-4 accent-primary"
                          {...form.register(
                            `educationList.${index}.isStudying`,
                          )}
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
                onClick={() =>
                  appendEducation({
                    institution: "",
                    major: "",
                    field: "",
                    gap: 0,
                    startData: "",
                    endData: "",
                    isStudying: false,
                  })
                }
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
              {experienceFields.map((field, index) => (
                <div key={field.id} className="space-y-6">
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
                          {...form.register(`experienceList.${index}.jobTitle`)}
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
                          {...form.register(
                            `experienceList.${index}.companyName`,
                          )}
                        />
                      </Field>
                    </div>
                    <Field>
                      <FieldLabel className="font-bold">Industry</FieldLabel>
                      <Input
                        placeholder="e.g. Technology, Finance"
                        className="h-11 border-none shadow-none"
                        variant="withBg"
                        {...form.register(`experienceList.${index}.industry`)}
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
                          {...form.register(
                            `experienceList.${index}.startData`,
                          )}
                        />
                      </Field>
                      <Field>
                        <FieldLabel className="font-bold">End Date</FieldLabel>
                        <Input
                          type="date"
                          className="h-11 border-none shadow-none"
                          variant="withBg"
                          {...form.register(`experienceList.${index}.endData`)}
                        />
                      </Field>
                    </div>
                    <Field>
                      <label className="flex items-center gap-2 text-sm font-bold cursor-pointer">
                        <input
                          type="checkbox"
                          className="size-4 accent-primary"
                          {...form.register(
                            `experienceList.${index}.isWorking`,
                          )}
                        />
                        Currently Working Here
                      </label>
                    </Field>
                    <Field>
                      <FieldLabel className="font-bold">Description</FieldLabel>
                      <Textarea
                        placeholder="Write something..."
                        className="min-h-32 border-none shadow-none resize-none bg-[#F5F5F5] dark:bg-[#222222]"
                        {...form.register(
                          `experienceList.${index}.Description`,
                        )}
                      />
                    </Field>
                  </FieldGroup>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-2 py-6 border-dashed border-2 hover:bg-slate-50 transition-colors"
                onClick={() =>
                  appendExperience({
                    jobTitle: "",
                    companyName: "",
                    industry: "",
                    startData: "",
                    endData: "",
                    isWorking: false,
                    Description: "",
                  })
                }
              >
                <PlusCircle className="size-5" />
                <span>Add Another Experience</span>
              </Button>
            </div>
          </div>

          {/* about me */}
          <div className="space-y-4 pt-4 border-t">
            <SectionTitle size={"sm"}>About Me</SectionTitle>
            <Controller
              name="aboutMe"
              control={form.control}
              render={({ field }) => (
                <RichTextEditor
                  value={field.value || ""}
                  onChange={field.onChange}
                  placeholder="Write about yourself..."
                />
              )}
            />
          </div>

          {/* social network */}
          <div className="space-y-6 pt-6 border-t">
            <SectionTitle size={"sm"}>Social Network</SectionTitle>
            <div className="grid grid-cols-2 gap-6">
              {[
                {
                  icon: FaFacebookF,
                  name: "facebook" as const,
                  label: "Facebook",
                  placeholder: "http://www.facebook.com/avitex",
                },
                {
                  icon: FaLinkedinIn,
                  name: "linkedin" as const,
                  label: "LinkedIn",
                  placeholder: "URL",
                },
                {
                  icon: FaTwitter,
                  name: "twitter" as const,
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
                      {...form.register(item.name)}
                      aria-invalid={!!form.formState.errors[item.name]}
                    />
                  </div>
                  {form.formState.errors[item.name] && (
                    <FieldError
                      className="ml-14"
                      errors={[form.formState.errors[item.name]]}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 flex justify-end">
            <Button type="submit" size="lg" className="w-full md:w-auto px-10">
              Save Profile
            </Button>
          </div>
        </form>
      </CommonWrapper>
    </div>
  );
}
