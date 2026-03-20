import Container from "@/components/common/Container";
import Stack from "@/components/common/Stack";
import { FileText, Briefcase, Heart } from "lucide-react";

const steps = [
  {
    icon: <FileText className="size-8 text-blue-600" />,
    title: "Free Resume Assessments",
    description:
      "Aenean Porta. Orci Locus Congue Lorem, Sit Amet Mollis Magna Velit Ac Trat Morbi Accumsan Purus Nec Vehicula Ornare, Nam Quis Tincidunt Nulla.",
    color: "bg-blue-50",
  },
  {
    icon: <Briefcase className="size-8 text-orange-600" />,
    title: "Job Fit Scoring",
    description:
      "Aenean Porta. Orci Locus Congue Lorem, Sit Amet Mollis Magna Velit Ac Trat Morbi Accumsan Purus Nec Vehicula Ornare, Nam Quis Tincidunt Nulla.",
    color: "bg-orange-50",
  },
  {
    icon: <Heart className="size-8 text-purple-600" />,
    title: "Help Every Step Of The Way",
    description:
      "Aenean Porta. Orci Locus Congue Lorem, Sit Amet Mollis Magna Velit Ac Trat Morbi Accumsan Purus Nec Vehicula Ornare, Nam Quis Tincidunt Nulla.",
    color: "bg-purple-50",
  },
];

export default function AboutSteps() {
  return (
    <section className="py-24">
      <Container>
        <Stack gap="xl" className="text-center">
          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              How it work?
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Pellentesque quis electus sagittis, gravida erat id, placerat
              tellus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="group p-8 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300"
              >
                <div
                  className={`size-16 rounded-2xl ${step.color} dark:bg-slate-900 flex items-center justify-center mb-6 mx-auto transition-transform duration-300 group-hover:scale-110`}
                >
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                  {step.description}
                </p>
                <button className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-center gap-2 mx-auto hover:gap-3 transition-all">
                  Start Now <span className="text-emerald-500">→</span>
                </button>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </section>
  );
}
