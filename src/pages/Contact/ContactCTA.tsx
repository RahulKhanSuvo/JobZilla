import Container from "@/components/common/Container";
import { Button } from "@/components/ui/button";
import worldMap from "@/assets/images/office_main.png";

export default function ContactCTA() {
  return (
    <section className="pb-20">
      <Container>
        <div className="bg-[#f8f7f2] dark:bg-slate-900/50 rounded-[20px] p-12 flex flex-col lg:flex-row items-center justify-between gap-12 overflow-hidden relative">
          <div className="space-y-6 max-w-xl relative z-10">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white">
              Recruiting?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Advertise your jobs to millions of monthly users and search 15.3
              millions cvs in our database.
            </p>
            <Button className="bg-[#139a74] hover:bg-emerald-700 text-white rounded-md px-8 h-14 text-lg font-bold">
              Start Recruiting Now
            </Button>
          </div>

          <div className="relative lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src={worldMap}
                alt="Recruiting"
                className="w-full max-w-[500px] h-auto object-contain opacity-20 grayscale brightness-50"
              />

              {/* Simplified floating dots and labels representation */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                {/* Hiring label */}
                <div className="absolute top-1/4 right-1/4 bg-white dark:bg-slate-900 px-4 py-2 rounded-full shadow-lg flex items-center gap-2 border border-slate-100 dark:border-slate-800">
                  <div className="size-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-[10px]">
                      +
                    </span>
                  </div>
                  <span className="text-sm font-bold">Hiring</span>
                </div>
              </div>
            </div>
          </div>

          {/* Subtle background decoration */}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl z-0" />
        </div>
      </Container>
    </section>
  );
}
