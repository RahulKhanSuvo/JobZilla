import SectionTitle from "@/components/common/SectionTitle";
import Paragraph from "@/components/common/Paragraph";
import Stack from "@/components/common/Stack";

export default function ClientReviewHeader() {
  return (
    <Stack align="center" gap="sm" className="mb-12 text-center">
      <SectionTitle className="text-4xl font-black">
        What our clients are saying
      </SectionTitle>
      <Paragraph className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 font-medium">
        Showing companies based on reviews and recent job openings
      </Paragraph>
    </Stack>
  );
}
