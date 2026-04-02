import CommonWrapper from "@/components/common/CommonWrapper";
import DashboardTitle from "@/components/common/DashboardTitle";
import SectionTitle from "@/components/common/SectionTitle";
import RichTextEditor from "@/components/common/RichTextEditor";
import SkillTagsInput from "@/components/common/SkillTagsInput";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  recruiterProfileSchema,
  type RecruiterProfileFormData,
} from "./recruiterProfileSchema";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Image as ImageIcon, ArrowLeft, Camera } from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";
import { useNavigate } from "react-router";

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
                    {form.watch("employerName") || "Company Name"}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG or JPEG. Max size 2MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CommonWrapper>

        {/* Information Section */}
        <CommonWrapper className="p-8 space-y-8">
          <SectionTitle size={"sm"}>Information</SectionTitle>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field>
              <FieldLabel>Employer Name</FieldLabel>
              <Input
                {...form.register("employerName")}
                placeholder="Avitex Agency"
              />
              <FieldError>
                {form.formState.errors.employerName?.message}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                {...form.register("email")}
                placeholder="hi.avitex@gmail.com"
              />
              <FieldError>{form.formState.errors.email?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel>Phone Number</FieldLabel>
              <Input {...form.register("phone")} placeholder="123 456 7890" />
              <FieldError>{form.formState.errors.phone?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel>Website</FieldLabel>
              <Input
                {...form.register("website")}
                placeholder="https://avitex.com"
              />
              <FieldError>{form.formState.errors.website?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel>Founded Date</FieldLabel>
              <Controller
                name="foundedDate"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(30)].map((_, i) => (
                        <SelectItem key={i} value={(2026 - i).toString()}>
                          {2026 - i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>
                {form.formState.errors.foundedDate?.message}
              </FieldError>
            </Field>
            <Field>
              <FieldLabel>Company Size</FieldLabel>
              <Controller
                name="companySize"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10-50">10 - 50</SelectItem>
                      <SelectItem value="50-200">50 - 200</SelectItem>
                      <SelectItem value="200-500">200 - 500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>
                {form.formState.errors.companySize?.message}
              </FieldError>
            </Field>

            <div className="space-y-3">
              <FieldLabel>Show profile</FieldLabel>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    {...form.register("showProfile")}
                    value="show"
                    className="size-4 accent-primary"
                  />
                  <span className="text-sm font-medium">Show</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    {...form.register("showProfile")}
                    value="hidden"
                    className="size-4 accent-primary"
                  />
                  <span className="text-sm font-medium">Hidden</span>
                </label>
              </div>
            </div>

            <Field className="md:col-span-2">
              <FieldLabel>
                Categories <span className="text-red-500">*</span>
              </FieldLabel>
              <Controller
                name="categories"
                control={form.control}
                render={({ field }) => (
                  <SkillTagsInput
                    placeholder="Add category..."
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <FieldError>
                {form.formState.errors.categories?.message}
              </FieldError>
            </Field>
          </FieldGroup>
        </CommonWrapper>

        {/* About Company Section */}
        <CommonWrapper className="p-8 space-y-8">
          <SectionTitle size={"sm"}>About Company </SectionTitle>
          <Controller
            name="aboutCompany"
            control={form.control}
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Start typing..."
              />
            )}
          />
          <FieldError>{form.formState.errors.aboutCompany?.message}</FieldError>
        </CommonWrapper>

        {/* Social Network Section */}
        <CommonWrapper className="p-8 space-y-8">
          <SectionTitle size={"sm"}>Social Network</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: "facebook", icon: FaFacebookF, label: "Facebook" },
              { name: "linkedin", icon: FaLinkedinIn, label: "Linkedin" },
              { name: "twitter", icon: FaTwitter, label: "Twitter" },
              { name: "pinterest", icon: FaPinterestP, label: "Pinterest" },
              { name: "instagram", icon: FaInstagram, label: "Instagram" },
              { name: "youtube", icon: FaYoutube, label: "Youtube" },
            ].map((social) => (
              <div key={social.name} className="flex items-center gap-3">
                <div className="size-11 flex items-center justify-center bg-slate-50 rounded-lg shrink-0 border border-border">
                  <social.icon className="size-5 text-slate-600" />
                </div>
                <Input
                  type="url"
                  {...form.register(
                    social.name as keyof RecruiterProfileFormData,
                  )}
                  placeholder="URL"
                  className="h-11"
                />
              </div>
            ))}
          </div>
        </CommonWrapper>

        {/* Contact Information Section */}
        <CommonWrapper className="p-8 space-y-8">
          <SectionTitle size={"sm"}>Contact Information</SectionTitle>
          <FieldGroup className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field className="md:col-span-2">
              <FieldLabel>Address</FieldLabel>
              <Input
                {...form.register("address")}
                placeholder="71 St. Takayamio, Tokyo"
              />
              <FieldError>{form.formState.errors.address?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel>Location</FieldLabel>
              <Controller
                name="location"
                control={form.control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="VietNam">VietNam</SelectItem>
                      <SelectItem value="USA">USA</SelectItem>
                      <SelectItem value="Japan">Japan</SelectItem>
                      <SelectItem value="Bangladesh">Bangladesh</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError>{form.formState.errors.location?.message}</FieldError>
            </Field>
            <Field>
              <FieldLabel>Map Location</FieldLabel>
              <Input
                {...form.register("mapLocation")}
                placeholder="243- 235 St. Takayamio, Tokyo"
              />
              <FieldError>
                {form.formState.errors.mapLocation?.message}
              </FieldError>
            </Field>
          </FieldGroup>
        </CommonWrapper>
      </form>
    </div>
  );
}
