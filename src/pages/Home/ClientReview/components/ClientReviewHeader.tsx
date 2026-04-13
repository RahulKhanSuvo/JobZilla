import SectionTitle from "@/components/common/SectionTitle";
import Paragraph from "@/components/common/Paragraph";
import Stack from "@/components/common/Stack";

export default function ClientReviewHeader() {
  return (
    <Stack align="center" gap="sm" className="mb-12 text-center">
      <SectionTitle className="text-2xl md:text-3xl font-bold">
        What our clients are saying
      </SectionTitle>
      <Paragraph className="text-sm md:text-base text-center">
        Showing companies based on reviews and recent job openings
      </Paragraph>
    </Stack>
  );
}
