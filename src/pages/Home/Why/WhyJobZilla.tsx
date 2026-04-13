import Container from "@/components/common/Container";
import Paragraph from "@/components/common/Paragraph";
import SectionTitle from "@/components/common/SectionTitle";
import Stack from "@/components/common/Stack";
import logo1 from "@/assets/logos/svgexport-1.svg";
import logo2 from "@/assets/logos/svgexport-2.svg";
import logo3 from "@/assets/logos/svgexport-3.svg";
import logo4 from "@/assets/logos/svgexport-4.svg";

const features = [
  {
    icon: logo1,
    title: "Reduce Hiring Bias",
    description:
      "Structured Digital Interviews Increase The Predictive Validity Of Your Hires By 65%.",
  },
  {
    icon: logo2,
    title: "Save Time & Headspace",
    description:
      "Reduce Your Time-To-Hire By Up To 75% And Free Up Headspace For Other HR",
  },
  {
    icon: logo3,
    title: "Minimize Environmental Impact",
    description:
      "Did You Know? U. S. Office Workers Use ~10,000 Sheets Of Paper Every Year.",
  },
  {
    icon: logo4,
    title: "Efficiency at Scale",
    description:
      "Our platform scales with your business, ensuring consistent results across all departments.",
  },
];

export default function WhyJobZilla() {
  return (
    <div className="bg-[#F5F5F2] dark:bg-slate-950/50 py-24 transition-colors duration-300">
      <Container>
        <Stack gap="xl">
          <div className="max-w-xl">
            <Stack gap="sm">
              <SectionTitle className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                What can I do with Jobtex?
              </SectionTitle>
              <Paragraph className="text-slate-500 dark:text-slate-400 font-medium">
                Streamline your hiring process with strategic channels to reach
                qualified candidates
              </Paragraph>
            </Stack>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {features.map((feature, idx) => (
              <div key={idx} className="group space-y-4">
                <div className="flex items-center justify-centergroup-hover:bg-emerald-50 dark:group-hover:bg-emerald-500/10 transition-all duration-300 group-hover:-translate-y-1">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="size-12 object-contain transition-all duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-[#121212] dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Stack>
      </Container>
    </div>
  );
}
