import type { FC } from "react";
import { Input } from "@/components/ui/input";

interface AvatarUploadProps {
  avatarUrl: string;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AvatarUpload: FC<AvatarUploadProps> = ({ avatarUrl, onFileChange }) => {
  return (
    <div className="flex gap-4 pb-7 border-b">
      <div className="size-28 shrink-0">
        <img
          src={avatarUrl}
          alt="Profile avatar"
          className="size-28 object-cover rounded-sm"
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h4 className="font-semibold text-[14px]">Upload a new avatar</h4>
          <p className="text-[12px] text-muted-foreground">
            JPG, PNG or GIF (max. 800x400px)
          </p>
        </div>
        <div>
          <Input
            className="border rounded-none cursor-pointer"
            type="file"
            accept="image/*"
            onChange={onFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
