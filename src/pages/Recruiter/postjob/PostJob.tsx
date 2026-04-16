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
import { useForm } from "@tanstack/react-form";
import { zodValidator, type ZodValidator } from "@tanstack/zod-form-adapter";
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

  const form = useForm<PostJobFormData, ZodValidator>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: [],
      gender: "",
      salaryType: "",
      salaryMin: "",
      salaryMax: "",
      experience: "",
      careerLevel: "",
      qualification: "",
      location: "",
      deadline: new Date(),
      jobType: "FULL_TIME",
      skills: "",
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: postJobSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        await createJob(value).unwrap();
        toast.success("Job posted successfully!");
      } catch (error) {
        errorToast(error);
      }
    },
  });

  return (
    <div className="space-y-6 pb-12">
      <DashboardTitle>Post A New Job</DashboardTitle>

      <form.Subscribe
        selector={(state) => ({
          values: state.values,
          errors: state.errors,
          fieldMeta: state.fieldMeta,
        })}
        children={(state) => (
          <pre className="text-red-500 bg-red-100 p-2 text-xs overflow-auto max-h-64">
            {JSON.stringify(state, null, 2)}
          </pre>
        )}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <CommonWrapper className="p-8 space-y-8">
          <FieldGroup className="space-y-6">
            <form.Field
              name="title"
              children={(field) => (
                <Field data-invalid={!!field.state.meta.errors.length}>
                  <FieldLabel className="font-semibold">
                    Job Title <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Input
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="UI UX Designer"
                    variant="withBg"
                    aria-invalid={!!field.state.meta.errors.length}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <form.Field
                name="category"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel className="font-semibold">Category</FieldLabel>
                    <Select
                      onValueChange={(val) =>
                        field.handleChange(val as typeof field.state.value)
                      }
                      value={field.state.value}
                    >
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border h-12 shadow-none w-full">
                        <SelectValue placeholder="Accountng/ Finance" />
                      </SelectTrigger>
                      <SelectContent>
                        {[
                          "Sales",
                          "Marketing",
                          "Finance",
                          "Development",
                          "IT",
                          "HR",
                          "Education",
                          "Healthcare",
                          "Customer Service",
                          "Engineering",
                          "Design",
                          "Food and Beverage",
                          "Other",
                        ].map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="jobType"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel className="font-semibold">Type</FieldLabel>
                    <Select
                      onValueChange={(val) =>
                        field.handleChange(val as typeof field.state.value)
                      }
                      value={field.state.value || "FULL_TIME"}
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
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="location"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel className="font-semibold">
                      Location <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Dhaka"
                      variant="withBg"
                      aria-invalid={!!field.state.meta.errors.length}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="tags"
                children={(field) => (
                  <Field
                    className="col-span-2"
                    data-invalid={!!field.state.meta.errors.length}
                  >
                    <FieldLabel className="font-semibold">Tag</FieldLabel>
                    <SkillTagsInput
                      value={field.state.value || []}
                      onChange={field.handleChange}
                      placeholder="Add tag..."
                      variant="withBg"
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="gender"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel className="font-semibold">Gender</FieldLabel>
                    <Select
                      onValueChange={(val) =>
                        field.handleChange(val as typeof field.state.value)
                      }
                      value={field.state.value || "Any"}
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
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="salaryType"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel className="font-semibold">
                      Salary Type
                    </FieldLabel>
                    <Select
                      onValueChange={(val) =>
                        field.handleChange(val as typeof field.state.value)
                      }
                      value={field.state.value || "Monthly"}
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
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="salaryMin"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel className="font-semibold">
                      Minimum Salary
                    </FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. 1000"
                      variant="withBg"
                      aria-invalid={!!field.state.meta.errors.length}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="salaryMax"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel className="font-semibold">
                      Maximum Salary
                    </FieldLabel>
                    <Input
                      type="number"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="e.g. 5000"
                      variant="withBg"
                      aria-invalid={!!field.state.meta.errors.length}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="experience"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel className="font-semibold">
                      Experience
                    </FieldLabel>
                    <Select
                      onValueChange={(val) =>
                        field.handleChange(val as typeof field.state.value)
                      }
                      value={field.state.value || "Fresher"}
                    >
                      <SelectTrigger className="bg-[#F5F5F5] dark:bg-[#222222] border-none h-12 shadow-none w-full">
                        <SelectValue placeholder="1 Years" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fresher">Fresher</SelectItem>
                        <SelectItem value="1 Year">1 Year</SelectItem>
                        <SelectItem value="2 Years">2 Years</SelectItem>
                        <SelectItem value="3+ Years">3+ Years</SelectItem>
                        <SelectItem value="4+ Years">4+ Years</SelectItem>
                        <SelectItem value="5+ Years">5+ Years</SelectItem>
                        <SelectItem value="6+ Years">6+ Years</SelectItem>
                        <SelectItem value="7+ Years">7+ Years</SelectItem>
                        <SelectItem value="8+ Years">8+ Years</SelectItem>
                        <SelectItem value="9+ Years">9+ Years</SelectItem>
                        <SelectItem value="10+ Years">10+ Years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="careerLevel"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel className="font-semibold">
                      Career Level
                    </FieldLabel>
                    <Select
                      onValueChange={(val) =>
                        field.handleChange(val as typeof field.state.value)
                      }
                      value={field.state.value || "Entry"}
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
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="qualification"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel className="font-semibold">
                      Qualification
                    </FieldLabel>
                    <Select
                      onValueChange={(val) =>
                        field.handleChange(val as typeof field.state.value)
                      }
                      value={field.state.value || "High School"}
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
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />

              <form.Field
                name="deadline"
                children={(field) => (
                  <Field data-invalid={!!field.state.meta.errors.length}>
                    <FieldLabel className="font-semibold flex items-center gap-2">
                      <Calendar className="size-4 text-primary" />
                      Applicant Deadline Date
                    </FieldLabel>
                    <Input
                      type="date"
                      value={
                        field.state.value instanceof Date
                          ? field.state.value.toISOString().split("T")[0]
                          : field.state.value
                      }
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(new Date(e.target.value))
                      }
                      variant="withBg"
                      className="cursor-pointer"
                      aria-invalid={!!field.state.meta.errors.length}
                    />
                    <FieldError errors={field.state.meta.errors} />
                  </Field>
                )}
              />
            </div>

            <form.Field
              name="description"
              children={(field) => (
                <Field data-invalid={!!field.state.meta.errors.length}>
                  <FieldLabel className="font-semibold">
                    Job Description <span className="text-red-500">*</span>
                  </FieldLabel>
                  <RichTextEditor
                    value={field.state.value}
                    onChange={field.handleChange}
                    placeholder="Start typing..."
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            />
          </FieldGroup>

          <div className="pt-6 flex justify-end">
            <Button
              type="submit"
              className="bg-primary text-white font-bold px-12 h-12 rounded"
            >
              {isLoading ? "Posting Job..." : "Post Job"}
            </Button>
          </div>
        </CommonWrapper>
      </form>
    </div>
  );
}
