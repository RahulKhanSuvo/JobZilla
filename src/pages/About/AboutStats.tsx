import Container from "@/components/common/Container";
import Stack from "@/components/common/Stack";

const stats = [
  { label: "Jobs Available", value: "25M+" },
  { label: "New Jobs This Week!", value: "177k+" },
  { label: "Companies Hiring", value: "298k+" },
  { label: "Candidates", value: "5M+" },
];

export default function AboutStats() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <Container>
        <Stack gap="xl" className="text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              The numbers don't lie
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              About 800+ new jobs everyday
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                <p className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                  {stat.value}
                </p>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </section>
  );
}
