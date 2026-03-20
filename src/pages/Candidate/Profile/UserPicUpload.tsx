import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { useRef, useState } from "react";

export default function UserPicUpload() {
  const [preview, setPreview] = useState("");
  const frominputRef = useRef<HTMLInputElement>(null);
  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  return (
    <div className="relative size-28">
      <Avatar className="size-28">
        <AvatarImage src={preview}></AvatarImage>
        <AvatarFallback>Me</AvatarFallback>
      </Avatar>
      <button
        onClick={() => frominputRef.current?.click()}
        className="absolute bottom-0 border border-white bg-primary rounded-full text-white size-9 flex items-center justify-center -right-1.5"
      >
        <Camera size={20} />
      </button>
      <input
        accept="image/*"
        ref={frominputRef}
        onChange={handelChange}
        className="hidden"
        type="file"
      />
    </div>
  );
}
