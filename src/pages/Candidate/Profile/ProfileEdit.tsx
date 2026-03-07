import CommonWrapper from "@/components/common/CommonWrapper";
import DashboardTitle from "@/components/common/DashboardTitle";
import SectionTitle from "@/components/common/SectionTitle";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProfileEdit() {
  return (
    <div className="space-y-6">
      <DashboardTitle>Profile Edit</DashboardTitle>
      <CommonWrapper className="p-7">
        {/* user photo*/}
        <div className="flex gap-4 pb-7 border-b ">
          <div className="size-28 border border-dashed"></div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <h4 className="font-semibold text-[14px]">Upload a new avator</h4>
              <p className="text-[12px]">JPG, PNG or GIF (max. 800x400px)</p>
            </div>
            <div>
              <Input className="border rounded-none" type="file" />
            </div>
          </div>
        </div>
        {/* usr info form */}
        <div className="space-y-6 pt-6">
          <SectionTitle size={"sm"}>Information</SectionTitle>
          <form>
            <FieldGroup className="grid grid-cols-2 gap-6">
              <Field>
                <FieldLabel className="font-bold">Full Name</FieldLabel>
                <Input
                  placeholder="Enter your full name"
                  className="h-11"
                  variant="withBg"
                  type="text"
                />
              </Field>
              <Field>
                <FieldLabel className="font-bold">Email</FieldLabel>
                <Input
                  placeholder="Enter your email address"
                  className="h-11"
                  variant="withBg"
                  type="email"
                />
              </Field>
              <Field>
                <FieldLabel className="font-bold">Phone</FieldLabel>
                <Input
                  placeholder="Enter your phone number"
                  className="h-11"
                  variant="withBg"
                  type="tel"
                />
              </Field>
              <Field>
                <FieldLabel className="font-bold">Date of Birth</FieldLabel>
                <Input
                  placeholder="Enter your date of birth"
                  className="h-11"
                  variant="withBg"
                  type="date"
                />
              </Field>
              <Select>
                <SelectGroup className="w-full flex flex-col gap-3">
                  <SelectLabel className="font-bold">Gender</SelectLabel>
                  <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                    <SelectValue
                      className=""
                      placeholder="Select your gender"
                    />
                  </SelectTrigger>
                  <SelectContent className="rounded-none" position="popper">
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </SelectGroup>
              </Select>
              <Field>
                <FieldLabel className="font-bold">Marital Status</FieldLabel>
                <Input
                  placeholder="Enter your marital status"
                  className="h-11"
                  variant="withBg"
                  type="text"
                />
              </Field>
              <Field>
                <FieldLabel className="font-bold">Nationality</FieldLabel>
                <Input
                  placeholder="Enter your nationality"
                  className="h-11"
                  variant="withBg"
                  type="text"
                />
              </Field>
              <Select>
                <SelectGroup className="w-full flex flex-col gap-3">
                  <SelectLabel className="font-bold">Nationality</SelectLabel>
                  <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                    <SelectValue
                      className=""
                      placeholder="Select your nationality"
                    />
                  </SelectTrigger>
                  <SelectContent className="rounded-none" position="popper">
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectContent>
                </SelectGroup>
              </Select>
            </FieldGroup>
          </form>
        </div>
      </CommonWrapper>
    </div>
  );
}
