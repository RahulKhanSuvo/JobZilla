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
import { useForm, Controller, useFieldArray } from "react-hook-form";
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
import {
  Trash2,
  Plus,
  Image as ImageIcon,
  Video,
  ArrowLeft,
} from "lucide-react";
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

  const {
    fields: galleryFields,
    append: appendGallery,
    remove: removeGallery,
  } = useFieldArray({
    control: form.control,
    name: "gallery",
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
          className="bg-primary text-white font-bold px-8"
        >
          Save Profile
        </Button>
      </div>

      <form
        id="profile-edit-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        {/* Logo and Cover Upload */}
        <CommonWrapper className="p-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Logo Upload */}
            <div className="space-y-4">
              <FieldLabel className="text-sm font-semibold">
                Upload a Logo:
              </FieldLabel>
              <p className="text-xs text-muted-foreground">JPG-80x80px</p>
              <div className="flex items-center gap-4">
                <div className="size-20 rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-slate-50">
                  {logoPreview ? (
                    <img
                      src={logoPreview}
                      alt="Logo"
                      className="size-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="size-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("logo-upload")?.click()
                    }
                    className="h-9 px-4"
                  >
                    Browse...
                  </Button>
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground">
                    No file selected.
                  </p>
                </div>
              </div>
            </div>

            {/* Cover Upload */}
            <div className="space-y-4 flex-1">
              <FieldLabel className="text-sm font-semibold">
                Upload a new cover:
              </FieldLabel>
              <p className="text-xs text-muted-foreground">JPG 1920x450px</p>
              <div className="flex items-center gap-4">
                <div className="h-20 w-full max-w-[400px] rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-slate-50">
                  {coverPreview ? (
                    <img
                      src={coverPreview}
                      alt="Cover"
                      className="size-full object-cover"
                    />
                  ) : (
                    <ImageIcon className="size-8 text-muted-foreground" />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() =>
                      document.getElementById("cover-upload")?.click()
                    }
                    className="h-9 px-4"
                  >
                    Browse...
                  </Button>
                  <input
                    id="cover-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="hidden"
                  />
                  <p className="text-xs text-muted-foreground">
                    No file selected.
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

            <Field className="md:col-span-2">
              <FieldLabel>Profile URL</FieldLabel>
              <Input
                {...form.register("profileUrl")}
                placeholder="https://jobsmake.com/company/avitex"
              />
              <FieldError>
                {form.formState.errors.profileUrl?.message}
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

        {/* Profile Photos */}
        <CommonWrapper className="p-8 space-y-8">
          <SectionTitle size={"sm"}>Profile Photo</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {galleryFields.map((field, index) => (
              <div
                key={field.id}
                className="relative aspect-video rounded-2xl overflow-hidden group border border-border"
              >
                <img
                  src={field.url}
                  alt=""
                  className="size-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeGallery(index)}
                  className="absolute top-3 right-3 p-1.5 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("gallery-upload")?.click()}
              className="gap-2"
            >
              <Plus className="size-4" />
              Browse
            </Button>
            <input
              id="gallery-upload"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                files.forEach((file) => {
                  const url = URL.createObjectURL(file);
                  appendGallery({ url });
                });
              }}
            />
            <span className="text-sm text-muted-foreground">Upload image</span>
          </div>
          <div className="space-y-4">
            <FieldLabel className="text-sm font-semibold flex items-center gap-2">
              <Video className="size-4 text-primary" />
              Introduction Video
            </FieldLabel>
            <Input
              {...form.register("introVideo")}
              placeholder="https://www.youtube.com/watch?v=i6ZLgk_bq90"
            />
            <FieldError>{form.formState.errors.introVideo?.message}</FieldError>
          </div>
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
