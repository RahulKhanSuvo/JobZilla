import { User } from "lucide-react";

interface Props {
  aboutMe?: string | null;
}

export default function ApplicantAbout({ aboutMe }: Props) {
  if (!aboutMe) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 text-slate-900 dark:text-slate-50">
        <User className="size-5 text-emerald-500" />
        <h2 className="text-xl font-bold">About Me</h2>
      </div>
      <div
        className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed prose prose-slate dark:prose-invert max-w-none prose-p:mb-3"
        dangerouslySetInnerHTML={{ __html: aboutMe }}
      />
    </section>
  );
}
