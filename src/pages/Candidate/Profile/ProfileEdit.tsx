import CommonWrapper from "@/components/common/CommonWrapper";
import DashboardTitle from "@/components/common/DashboardTitle";
import emptyImage from "@/assets/logos/image-up.jpg";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
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
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { profileSchema, type ProfileFormData } from "./profileSchema";
import { toast } from "sonner";

export default function ProfileEdit() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
      age: undefined,
      experience: undefined,
      skills: [],
      aboutMe: "",
      facebook: "",
      linkedin: "",
      twitter: "",
      pinterest: "",
      instagram: "",
      youtube: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    console.log("Form Data:", data);
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="space-y-6">
      <DashboardTitle>Profile Edit</DashboardTitle>
      <CommonWrapper className="p-7">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* user photo*/}
          <div className="flex gap-4 pb-7 border-b ">
            <div className="size-28 ">
              <img
                src={previewUrl || emptyImage}
                alt="empty"
                className="size-28 object-cover rounded-md"
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <h4 className="font-semibold text-[14px]">
                  Upload a new avator
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
          <div className="space-y-6 pt-6">
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
              <Field>
                <FieldLabel className="font-bold">Age</FieldLabel>
                <Controller
                  name="age"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                        <SelectValue
                          className=""
                          placeholder="Select your age"
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-none" position="popper">
                        <SelectItem value="option1">18-20</SelectItem>
                        <SelectItem value="option2">20-22</SelectItem>
                        <SelectItem value="option3">22-24</SelectItem>
                        <SelectItem value="option4">24-26</SelectItem>
                        <SelectItem value="option5">26-28</SelectItem>
                        <SelectItem value="option6">28-30</SelectItem>
                        <SelectItem value="option7">30-32</SelectItem>
                        <SelectItem value="option8">32-34</SelectItem>
                        <SelectItem value="option9">34-36</SelectItem>
                        <SelectItem value="option10">36-38</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              <Field>
                <FieldLabel className="font-bold">Experience</FieldLabel>
                <Controller
                  name="experience"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                        <SelectValue
                          className=""
                          placeholder="Select your experience"
                        />
                      </SelectTrigger>
                      <SelectContent className="rounded-none" position="popper">
                        <SelectItem value="option1">1 Year</SelectItem>
                        <SelectItem value="option2">2 Year</SelectItem>
                        <SelectItem value="option3">3 Year</SelectItem>
                        <SelectItem value="option4">4 Year</SelectItem>
                        <SelectItem value="option5">5 Year</SelectItem>
                        <SelectItem value="option6">6 Year</SelectItem>
                        <SelectItem value="option7">7 Year</SelectItem>
                        <SelectItem value="option8">8 Year</SelectItem>
                        <SelectItem value="option9">9 Year</SelectItem>
                        <SelectItem value="option10">10 Year</SelectItem>
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
          <div className="space-y-6 pt-6 border-t mt-6">
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
                {
                  icon: FaPinterestP,
                  name: "pinterest" as const,
                  label: "Pinterest",
                  placeholder: "URL",
                },
                {
                  icon: FaInstagram,
                  name: "instagram" as const,
                  label: "Instagram",
                  placeholder: "URL",
                },
                {
                  icon: FaYoutube,
                  name: "youtube" as const,
                  label: "YouTube",
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
