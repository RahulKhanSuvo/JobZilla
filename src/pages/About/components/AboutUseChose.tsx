import { Button } from "@/components/ui/button";
import bg from "@assets/background/CTA.d1c7bffe.png";
export default function AboutUseChose() {
  return (
    <section
      style={{ backgroundImage: `url(${bg})` }}
      className="bg-cover text-center flex flex-col items-center justify-center text-white md:min-h-[286px] gap-8"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-4xl font-bold">
          Job Opportunities Are Always Open
        </h2>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quod.
        </p>
      </div>
      <div className="flex gap-4">
        <Button className="bg-white text-primary rounded font-bold hover:bg-white hover:text-primary">
          Find Your Dream Job
        </Button>
        <Button className="bg-white text-primary rounded font-bold hover:bg-white hover:text-primary">
          Post Your Job
        </Button>
      </div>
    </section>
  );
}
