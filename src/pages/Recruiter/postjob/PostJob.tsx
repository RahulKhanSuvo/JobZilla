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
import { Calendar } from "lucide-react";
import RichTextEditor from "@/components/common/RichTextEditor";
import SkillTagsInput from "@/components/common/SkillTagsInput";
import { useCreateJobMutation } from "@/redux/features/job/job.api";
import { errorToast } from "@/utils/errorToast";

export default function PostJob() {
  const [createJob, { isLoading }] = useCreateJobMutation();
  const form = useForm<PostJobFormData>({
    resolver: zodResolver(postJobSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: [],
      gender: "",
      externalUrl: "",
      applyEmail: "",
      salaryType: "",
      salaryMin: 0,
      salaryMax: 0,
      experience: "",
      careerLevel: "",
      qualification: "",
      deadline: new Date(),
      jobType: "FULL_TIME",
      skills: "",
      applyType: "Internal",
    },
  });

  const onSubmit = async (data: PostJobFormData) => {
    try {
      await createJob(data).unwrap();
      toast.success("Job posted successfully!");
    } catch (error) {
      errorToast(error);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <DashboardTitle>Post A New Job</DashboardTitle>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CommonWrapper className="p-8 space-y-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Field>
                <FieldLabel className="font-semibold">Category</FieldLabel>
                <Controller
                  name="category"
                  control={form.control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border h-12 shadow-none w-full">
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
                  name="jobType"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "FULL_TIME"}
                    >
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border-none h-12 shadow-none w-full">
                        <SelectValue placeholder="Freelance" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FULL_TIME">Full-time</SelectItem>
                        <SelectItem value="PART_TIME">Part-time</SelectItem>
                        <SelectItem value="FREELANCE">Freelance</SelectItem>
                        <SelectItem value="REMOTE">Remote</SelectItem>
                        <SelectItem value="CONTRACT">Contract</SelectItem>
                        <SelectItem value="INTERN">Intern</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError>
                  {form.formState.errors.jobType?.message}
                </FieldError>
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "Any"}
                    >
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border-none h-12 shadow-none w-full rounded-none">
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "Internal"}
                    >
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
                  type="url"
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "Monthly"}
                    >
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
                <FieldLabel className="font-semibold">
                  Minimum Salary
                </FieldLabel>
                <Input
                  type="number"
                  {...form.register("salaryMin")}
                  placeholder="e.g. 1000"
                  variant="withBg"
                />
                <FieldError>
                  {form.formState.errors.salaryMin?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className="font-semibold">
                  Maximum Salary
                </FieldLabel>
                <Input
                  type="number"
                  {...form.register("salaryMax")}
                  placeholder="e.g. 5000"
                  variant="withBg"
                />
                <FieldError>
                  {form.formState.errors.salaryMax?.message}
                </FieldError>
              </Field>

              <Field>
                <FieldLabel className="font-semibold">Experience</FieldLabel>
                <Controller
                  name="experience"
                  control={form.control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "Fresher"}
                    >
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "Entry"}
                    >
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
                    <Select
                      onValueChange={field.onChange}
                      value={field.value || "High School"}
                    >
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
          </FieldGroup>

          <div className="pt-6 flex justify-end">
            <Button
              type="submit"
              className="bg-primary text-white font-bold px-12 h-12 rounded-xl"
            >
              {isLoading ? "Posting Job..." : "Post Job"}
            </Button>
          </div>
        </CommonWrapper>
      </form>
    </div>
  );
}
