import { Button } from "@/components/ui/button";
import bg from "@assets/background/CTA.d1c7bffe.png";
export default function AboutUseChose() {
  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-cover text-center flex flex-col items-center justify-center text-white py-16 md:py-20 md:min-h-[286px] gap-8 px-4"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">
          Job Opportunities Are Always Open
        </h2>
        <p className="text-base md:text-lg max-w-2xl font-medium opacity-90">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quod.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6 sm:px-0">
        <Button className="bg-white text-primary rounded font-bold hover:bg-white/90 hover:text-primary w-full sm:w-auto h-12">
          Find Your Dream Job
        </Button>
        <Button className="bg-white text-primary rounded font-bold hover:bg-white/90 hover:text-primary w-full sm:w-auto h-12 border-none">
          Post Your Job
        </Button>
      </div>
    </section>
  );
}
