import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldContent } from "@/components/ui/field";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

export function SocialSettings() {
  const socialPlatforms = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-[#1877F2]" />,
      placeholder: "https://facebook.com/jobzilla",
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-[#1DA1F2]" />,
      placeholder: "https://twitter.com/jobzilla",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-[#0A66C2]" />,
      placeholder: "https://linkedin.com/company/jobzilla",
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-[#E4405F]" />,
      placeholder: "https://instagram.com/jobzilla",
    },
    {
      name: "GitHub",
      icon: <FaGithub className="text-foreground" />,
      placeholder: "https://github.com/jobzilla",
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Social Media Profiles</CardTitle>
          <CardDescription>
            These links will be displayed in the footer and contact pages.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {socialPlatforms.map((platform) => (
            <Field
              key={platform.name}
              orientation="horizontal"
              className="items-center gap-4"
            >
              <div className="flex items-center gap-3 min-w-[140px]">
                <div className="text-xl">{platform.icon}</div>
                <FieldLabel className="mb-0">{platform.name}</FieldLabel>
              </div>
              <FieldContent className="flex-1">
                <Input placeholder={platform.placeholder} />
              </FieldContent>
            </Field>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Open Graph & Metadata</CardTitle>
          <CardDescription>
            Configure how your site looks when shared on social media.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field>
            <FieldLabel>Default Share Image (OG Image)</FieldLabel>
            <FieldContent>
              <div className="border-2 border-dashed rounded p-8 text-center bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PNG, JPG up to 5MB (1200x630px recommended)
                </p>
              </div>
            </FieldContent>
          </Field>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button variant="outline">Discard</Button>
        <Button>Update Social Links</Button>
      </div>
    </div>
  );
}
