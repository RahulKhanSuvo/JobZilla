interface JobDescriptionProps {
  description?: string;
}

export default function JobDescription({ description }: JobDescriptionProps) {
  return (
    <div className="space-y-10">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
          Full Job Description
        </h2>
        <div
          className="text-[15px] text-slate-500 dark:text-slate-400 leading-[1.8] space-y-6 prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{
            __html: description || "No description provided.",
          }}
        />
      </section>
    </div>
  );
}
