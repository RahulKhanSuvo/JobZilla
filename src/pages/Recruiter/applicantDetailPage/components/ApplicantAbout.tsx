interface Props {
  aboutMe?: string | null;
}

export default function ApplicantAbout({ aboutMe }: Props) {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">About Me</h2>
      {aboutMe ? (
        <div
          className="text-[#64666c] dark:text-gray-300 mb-4 leading-relaxed prose dark:prose-invert max-w-none [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
          dangerouslySetInnerHTML={{
            __html: aboutMe || "",
          }}
        />
      ) : (
        <p className="text-slate-400 text-sm">
          No about me information provided yet.
        </p>
      )}
    </section>
  );
}
