import bgImage from "@assets/background/indoor-plants-studio.avif";

interface LoginInfoProps {
  heading?: string;
  subheading?: string;
}

export default function LoginInfo({
  heading = "Welcome back",
  subheading = "Sign in to continue your professional journey and discover new opportunities.",
}: LoginInfoProps) {
  return (
    <div
      className="relative h-full bg-cover grow bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-[#050A30]/50 to-[#050A30]/85" />

      {/* Content */}
      <div className="relative z-10 flex justify-between flex-col p-11 h-full">
        {/* Brand logo */}
        <div className="text-2xl font-bold text-white">JobNest</div>

        <div className="text-white flex flex-col gap-2">
          <h3 className="text-6xl font-bold leading-tight">{heading}</h3>
          <p className="text-xl mt-3 text-[#EFF6FFCC]">{subheading}</p>
        </div>

        <p className="text-white/70 text-sm uppercase tracking-widest">
          Trusted by industry leaders
        </p>
      </div>
    </div>
  );
}
