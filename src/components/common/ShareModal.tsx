import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Check, Twitter, Facebook, Linkedin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  url: string;
}

export default function ShareModal({
  isOpen,
  onClose,
  jobTitle,
  url,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="size-5 text-[#1877F2]" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: "hover:bg-[#1877F2]/10",
    },
    {
      name: "Twitter",
      icon: <Twitter className="size-5 text-[#1DA1F2]" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this job: ${jobTitle}`)}&url=${encodeURIComponent(url)}`,
      color: "hover:bg-[#1DA1F2]/10",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="size-5 text-[#0A66C2]" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      color: "hover:bg-[#0A66C2]/10",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp className="size-5 text-[#25D366]" />,
      url: `https://wa.me/?text=${encodeURIComponent(`${jobTitle} - ${url}`)}`,
      color: "hover:bg-[#25D366]/10",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="sm:max-w-md dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Share this job
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {/* Social Links Grid */}
          <div className="grid grid-cols-4 gap-4">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${link.color} group`}
              >
                <div className="size-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center transition-transform group-hover:scale-110">
                  {link.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  {link.name}
                </span>
              </a>
            ))}
          </div>

          {/* Copy Link Section */}
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
              Copy Link
            </p>
            <div className="flex items-center gap-2 p-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg group focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all">
              <input
                type="text"
                readOnly
                value={url}
                className="flex-1 bg-transparent text-sm font-medium px-2 outline-none text-slate-600 dark:text-slate-300 truncate"
              />
              <Button
                onClick={handleCopy}
                size="sm"
                className={`h-9 px-4 font-bold transition-all ${copied ? "bg-emerald-500 hover:bg-emerald-600" : "bg-slate-900 dark:bg-slate-100 dark:text-slate-900"}`}
              >
                {copied ? (
                  <Check className="size-4 mr-2" />
                ) : (
                  <Copy className="size-4 mr-2" />
                )}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
