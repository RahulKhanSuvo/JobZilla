import { ShieldAlert } from "lucide-react";
import { Section } from "./ui/Section";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
const passwordShema = z.object({
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Phone number is required"),
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(1, "New password is required"),
});
const fields = [
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "Enter your email",
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    name: "currentPassword",
    label: "Current Password",
    type: "password",
    placeholder: "Enter your current password",
  },
  {
    name: "newPassword",
    label: "New Password",
    type: "password",
    placeholder: "Enter your new password",
  },
] as const;
export default function GeneralAccount() {
  const user = useSelector(selectCurrentUser);
  console.log(user);
  const form = useForm<z.infer<typeof passwordShema>>({
    resolver: zodResolver(passwordShema),
    defaultValues: {
      email: user?.email,
      phone: user?.candidate?.phone,
      currentPassword: "",
      newPassword: "",
    },
  });
  const onSubmit = (data: z.infer<typeof passwordShema>) => {
    console.log(data);
  };
  return (
    <Section icon={<ShieldAlert className="w-5 h-5" />} title="General Account">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map((inputField) => (
            <Controller
              key={inputField.name}
              name={inputField.name}
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    {inputField.label}
                  </FieldLabel>
                  <Input
                    disabled={inputField.name === "email"}
                    id={field.name}
                    type={inputField.type}
                    placeholder={inputField.placeholder}
                    aria-invalid={fieldState.invalid}
                    {...field}
                    className="w-full h-10 px-3 rounded-lg border border-gray-200 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          ))}
        </div>

        {/* Save button */}
        <div className="flex justify-end mt-6 pt-5 border-t border-gray-100">
          <Button className="" type="submit">
            Update Account
          </Button>
        </div>
      </form>
    </Section>
  );
}
