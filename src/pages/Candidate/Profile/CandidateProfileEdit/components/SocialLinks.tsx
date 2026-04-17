import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import CommonWrapper from "@/components/common/CommonWrapper";
import SectionTitle from "@/components/common/SectionTitle";
import { Input } from "@/components/ui/input";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import type { ProfileFormData } from "../../profileSchema";

export default function SocialLinks() {
  const { control } = useFormContext<ProfileFormData>();

  return (
    <CommonWrapper className="p-8 space-y-8">
      <SectionTitle size="sm">Social Network</SectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={control}
          name="facebook"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Facebook size={16} className="text-blue-600" />
                Facebook
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://facebook.com/your-profile"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="linkedin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Linkedin size={16} className="text-blue-700" />
                LinkedIn
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://linkedin.com/in/your-profile"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="twitter"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Twitter size={16} className="text-sky-500" />
                Twitter
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="https://twitter.com/your-handle"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </CommonWrapper>
  );
}
