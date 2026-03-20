import SectionTitle from "@/components/common/SectionTitle";
import Paragraph from "@/components/common/Paragraph";
import Stack from "@/components/common/Stack";

export default function FeaturedJobsHeader() {
  return (
    <Stack align="center" gap="sm" className="mb-10 text-center">
      <SectionTitle className="text-4xl font-black">Featured Jobs</SectionTitle>
      <Paragraph className="max-w-2xl mx-auto text-slate-500 dark:text-slate-400 font-medium">
        Find the job that's perfect for you. about 800+ new jobs everyday
      </Paragraph>
    </Stack>
  );
}
