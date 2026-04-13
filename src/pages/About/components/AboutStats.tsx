import Container from "@/components/common/Container";
import Stack from "@/components/common/Stack";
import bg from "@assets/background/couter.2b1a7c9c.png";

const stats = [
  { label: "Jobs Available", value: "25M+" },
  { label: "New Jobs This Week!", value: "177k+" },
  { label: "Companies Hiring", value: "298k+" },
  { label: "Candidates", value: "5M+" },
];
export default function AboutStats() {
  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="py-20 bg-slate-50 dark:bg-slate-900/50 "
    >
      <Container className="flex justify-center text-center">
        <Stack gap="xl" className="text-center ">
          <div className="space-y-2 flex flex-col justify-center w-full">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              The numbers don't lie
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              About 800+ new jobs everyday
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-all duration-300">
            {stats.map((stat, idx) => (
              <div key={idx} className="border-r p-4 last:border-r-0">
                <p className="text-4xl font-black text-slate-900  dark:text-white mb-2">
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
