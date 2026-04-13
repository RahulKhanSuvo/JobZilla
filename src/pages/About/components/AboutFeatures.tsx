import Container from "@/components/common/Container";
import { CheckCircle2 } from "lucide-react";
import worldMap from "@assets/background/worldmap.png";

const benefits = [
  "Access to millions of job seekers",
  "Only pay for the candidates you want to contact",
  "Post unlimited jobs for free—all from one place",
  "Premium job placement on SimplyHired, Indeed, & over 100 job boards",
];

export default function AboutFeatures() {
  return (
    <section className="py-24 overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative z-10 rounded-3xl overflow-hidden">
              <img
                src={worldMap}
                alt="Global Opportunities"
                className="h-auto object-cover"
              />
            </div>

            <div className="absolute top-10 z-30 left-10 bg-white dark:bg-slate-90 p-4 rounded-2xl shadow-[0_14px_20px_0_hsla(0,0%,6%,0.1)] flex items-center gap-3 animate-float">
              <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold">19k+</span>
              </div>
              <p className="text-xs font-bold">Candidates</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                Get the job that's right for you
              </h2>
              <p className="text-lg text-slate-500 dark:text-slate-400">
                Search millions of jobs and get the inside scoop on companies
                with employee reviews, personalized salary tools, and more.
              </p>
            </div>

            <ul className="space-y-4">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="mt-1 shrink-0">
                    <CheckCircle2 className="size-6 text-emerald-500" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
