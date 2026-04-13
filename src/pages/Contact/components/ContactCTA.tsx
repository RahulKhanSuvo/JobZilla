import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import worldMap from "@/assets/background/banner.0068c22f.jpg";

export default function ContactCTA() {
  return (
    <section className="pb-20">
      <Container
        className="max-w-7xl rounded-md"
        style={{
          backgroundImage: `url(${worldMap})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="p-6 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative text-center lg:text-left">
          <div className="space-y-2 max-w-xl relative z-10">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Recruiting?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Advertise your jobs to millions of monthly users and search 15.3
              millions cvs in our database.
            </p>
            <Button className="bg-[#139a74] hover:bg-emerald-700 text-white rounded px-8 h-12 text-md font-bold">
              Start Recruiting Now
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
