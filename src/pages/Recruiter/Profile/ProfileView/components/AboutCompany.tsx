import CommonWrapper from "@/components/common/CommonWrapper";
import type { RecruiterProfileFormData } from "../../recruiterProfileSchema";

export default function AboutCompany({
  company,
}: {
  company: RecruiterProfileFormData | null | undefined;
}) {
  const plainAbout = company?.description?.replace(/<[^>]+>/g, "").trim();
  return (
    <div className="space-y-6">
      <CommonWrapper className="p-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground">About Company</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              {plainAbout ? (
                <div
                  className="text-[#64666c] dark:text-gray-300 mb-4 leading-relaxed prose dark:prose-invert max-w-none [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
                  dangerouslySetInnerHTML={{
                    __html: company?.description || "",
                  }}
                />
              ) : (
                <p className="text-[#64666c] dark:text-gray-400 mb-4 italic">
                  No description added yet.
                </p>
              )}
            </p>
          </div>
        </div>
      </CommonWrapper>
    </div>
  );
}
