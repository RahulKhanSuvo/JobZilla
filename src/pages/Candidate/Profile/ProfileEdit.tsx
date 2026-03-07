import CommonWrapper from "@/components/common/CommonWrapper";
import DashboardTitle from "@/components/common/DashboardTitle";
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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
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
  const [aboutMe, setAboutMe] = useState("");

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
                <FieldLabel className="font-bold">Location</FieldLabel>
                <Input
                  placeholder="Enter your location"
                  className="h-11"
                  variant="withBg"
                  type="text"
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
                    <SelectValue className="" placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none" position="popper">
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
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
                  <SelectLabel className="font-bold">Age</SelectLabel>
                  <SelectTrigger className="w-full rounded-none shadow-none bg-[#F5F5F5] dark:bg-[#222222]">
                    <SelectValue className="" placeholder="Select your age" />
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
                </SelectGroup>
              </Select>
              <Select>
                <SelectGroup className="w-full flex flex-col gap-3">
                  <SelectLabel className="font-bold">Experience</SelectLabel>
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
                </SelectGroup>
              </Select>
              <Field className="col-span-2">
                <FieldLabel className="font-bold">Skills</FieldLabel>
                <SkillTagsInput variant="withBg" />
              </Field>
            </FieldGroup>
          </form>
          {/* about me */}
          <div className="space-y-4 pt-4 border-t">
            <SectionTitle size={"sm"}>About Me</SectionTitle>
            <RichTextEditor
              value={aboutMe}
              onChange={(content) => setAboutMe(content)}
              placeholder="Write about yourself..."
            />
          </div>
        </div>
        {/* social network */}
        <div className="space-y-6 pt-6 border-t mt-6">
          <SectionTitle size={"sm"}>Social Network</SectionTitle>
          <div className="grid grid-cols-2 gap-6">
            {[
              {
                icon: FaFacebookF,
                label: "Facebook",
                placeholder: "http://www.facebook.com/avitex",
              },
              { icon: FaLinkedinIn, label: "LinkedIn", placeholder: "URL" },
              { icon: FaTwitter, label: "Twitter", placeholder: "URL" },
              { icon: FaPinterestP, label: "Pinterest", placeholder: "URL" },
              { icon: FaInstagram, label: "Instagram", placeholder: "URL" },
              { icon: FaYoutube, label: "YouTube", placeholder: "URL" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex items-center justify-center size-10 rounded-full bg-[#F5F5F5] dark:bg-[#222222] shrink-0">
                  <item.icon className="text-[14px]" />
                </div>
                <Input
                  placeholder={item.placeholder}
                  className="h-11 border-none shadow-none"
                  variant="withBg"
                />
              </div>
            ))}
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}
