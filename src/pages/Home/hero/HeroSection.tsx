import heroImage from "@assets/background/slider1.569c5d1f.jpg";
import Container from "@/components/common/Container";
import HeroSearch from "./HeroSearch";
export default function HeroSection() {
  return (
    <div className="relative">
      <img
        src={heroImage}
        alt=""
        className="w-full h-[75vh] object-cover z-0 absolute"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[rgba(10,10,30,0.7)] to-[rgba(10,10,30,0.3)] z-10"></div>
      <Container
        size="none"
        className="flex justify-between h-[75vh] gap-2.5 z-20 relative"
      >
        {/* left */}
        <div className="w-2/3 flex flex-col justify-center gap-8 ">
          <div className="flex flex-col    gap-7 justify-center w-[80%]">
            <h1 className="text-6xl font-bold text-white">
              Get hired by <br /> the popular teams.
            </h1>
            <p className="text-xl text-white">
              Explore high-paying jobs, connect with top recruiters, and build
              the career you deserve. Simple, fast, and effective.
            </p>
          </div>
          <HeroSearch />
        </div>
      </Container>
    </div>
  );
}
