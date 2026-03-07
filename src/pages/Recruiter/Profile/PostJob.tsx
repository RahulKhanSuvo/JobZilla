import DashboardTitle from "@/components/common/DashboardTitle";
import CommonWrapper from "@/components/common/CommonWrapper";
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
import { postJobSchema, type PostJobFormData } from "./postJobSchema";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Image as ImageIcon, Video, Calendar } from "lucide-react";
import RichTextEditor from "@/components/common/RichTextEditor";
import SkillTagsInput from "@/components/common/SkillTagsInput";

export default function PostJob() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const form = useForm<PostJobFormData>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      type: "",
      tags: [],
      gender: "",
      applyType: "Internal",
      externalUrl: "",
      applyEmail: "",
      salaryType: "",
      experience: "",
      careerLevel: "",
      qualification: "",
      videoUrl: "",
      deadline: "",
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: PostJobFormData) => {
    console.log("Post Job Data:", data);
    toast.success("Job posted successfully!");
  };

  return (
    <div className="space-y-6 pb-12">
      <DashboardTitle>Post A New Job</DashboardTitle>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CommonWrapper className="p-8 space-y-8">
          {/* Featured Image */}
          <div className="space-y-4">
            <FieldLabel className="text-sm font-semibold">
              Featured Image <span className="text-red-500">*</span>
            </FieldLabel>
            <div className="flex items-center gap-6">
              <div className="size-32 rounded-xl border-2 border-dashed border-border flex items-center justify-center overflow-hidden bg-slate-50">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="size-full object-cover"
                  />
                ) : (
                  <ImageIcon className="size-10 text-muted-foreground" />
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("job-image")?.click()}
                  className="h-10 px-6 font-semibold"
                >
                  Browse
                </Button>
                <input
                  id="job-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <p className="text-sm text-muted-foreground">Upload image</p>
              </div>
            </div>
          </div>

          <FieldGroup className="space-y-6">
            <Field>
              <FieldLabel className="font-semibold">
                Job Title <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                {...form.register("title")}
                placeholder="UI UX Designer"
                variant="withBg"
              />
              <FieldError>{form.formState.errors.title?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel className="font-semibold">
                Job Description <span className="text-red-500">*</span>
              </FieldLabel>
              <Controller
                name="description"
                control={form.control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Start typings..."
                  />
                )}
              />
              <FieldError>
                {form.formState.errors.description?.message}
              </FieldError>
            </Field>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel className="font-semibold">Category</FieldLabel>
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border-none h-12 shadow-none w-full">
                        <SelectValue placeholder="Accountng/ Finance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="Development">Development</SelectItem>
                        <SelectItem value="Marketing">Marketing</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>
                  {form.formState.errors.category?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className="font-semibold">Type</FieldLabel>
                <Controller
                  name="type"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border-none h-12 shadow-none w-full">
                        <SelectValue placeholder="Freelance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>{form.formState.errors.type?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel className="font-semibold">Tag</FieldLabel>
                <Controller
                  name="tags"
                  control={form.control}
                  render={({ field }) => (
                    <SkillTagsInput
                      value={field.value || []}
                      onChange={field.onChange}
                      placeholder="Add tag..."
                      variant="withBg"
                    />
                  )}
                />
              </Field>

              <Field>
                <FieldLabel className="font-semibold">Gender</FieldLabel>
                <Controller
                  name="gender"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border-none h-12 shadow-none w-full">
                        <SelectValue placeholder="10 - 50" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Any">Any</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>{form.formState.errors.gender?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel className="font-semibold">
                  Job Apply Type
                </FieldLabel>
                <Controller
                  name="applyType"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border-none h-12 shadow-none w-full">
                        <SelectValue placeholder="Internal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Internal">Internal</SelectItem>
                        <SelectItem value="External">External</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field>
                <FieldLabel className="font-semibold">
                  External URL for Apply Job
                </FieldLabel>
                <Input
                  {...form.register("externalUrl")}
                  placeholder="https://"
                  variant="withBg"
                />
                <FieldError>
                  {form.formState.errors.externalUrl?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className="font-semibold">
                  Job Apply Email
                </FieldLabel>
                <Input
                  {...form.register("applyEmail")}
                  placeholder="email@example.com"
                  variant="withBg"
                />
                <FieldError>
                  {form.formState.errors.applyEmail?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className="font-semibold">Salary Type</FieldLabel>
                <Controller
                  name="salaryType"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border-none h-12 shadow-none w-full">
                        <SelectValue placeholder="1 Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                        <SelectItem value="Weekly">Weekly</SelectItem>
                        <SelectItem value="Hourly">Hourly</SelectItem>
                        <SelectItem value="Fixed">Fixed</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>
                  {form.formState.errors.salaryType?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className="font-semibold">Experience</FieldLabel>
                <Controller
                  name="experience"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border-none h-12 shadow-none w-full">
                        <SelectValue placeholder="1 Years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fresher">Fresher</SelectItem>
                        <SelectItem value="1 Year">1 Year</SelectItem>
                        <SelectItem value="2 Years">2 Years</SelectItem>
                        <SelectItem value="3+ Years">3+ Years</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>
                  {form.formState.errors.experience?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className="font-semibold">Career Level</FieldLabel>
                <Controller
                  name="careerLevel"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border-none h-12 shadow-none w-full">
                        <SelectValue placeholder="Managerial" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entry">Entry Level</SelectItem>
                        <SelectItem value="Mid">Mid Level</SelectItem>
                        <SelectItem value="Senior">Senior Level</SelectItem>
                        <SelectItem value="Managerial">Managerial</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>
                  {form.formState.errors.careerLevel?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className="font-semibold">Qualification</FieldLabel>
                <Controller
                  name="qualification"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border-none h-12 shadow-none w-full">
                        <SelectValue placeholder="Certificate" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="High School">High School</SelectItem>
                        <SelectItem value="Bachelor">
                          Bachelor Degree
                        </SelectItem>
                        <SelectItem value="Master">Master Degree</SelectItem>
                        <SelectItem value="PhD">PhD</SelectItem>
                        <SelectItem value="Certificate">Certificate</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>
                  {form.formState.errors.qualification?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className="font-semibold flex items-center gap-2">
                  <Video className="size-4 text-primary" />
                  Introduction Video URL
                </FieldLabel>
                <Input
                  {...form.register("videoUrl")}
                  placeholder="https://"
                  variant="withBg"
                />
                <FieldError>
                  {form.formState.errors.videoUrl?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className="font-semibold flex items-center gap-2">
                  <Calendar className="size-4 text-primary" />
                  Applicant Deadline Date
                </FieldLabel>
                <Input
                  type="date"
                  {...form.register("deadline")}
                  variant="withBg"
                  className="cursor-pointer"
                />
                <FieldError>
                  {form.formState.errors.deadline?.message}
                </FieldError>
              </Field>
            </div>
          </FieldGroup>

          <div className="pt-6 flex justify-end">
            <Button
              type="submit"
              className="bg-primary text-white font-bold px-12 h-12 rounded-xl"
            >
              Post Job
            </Button>
          </div>
        </CommonWrapper>
      </form>
    </div>
  );
}
