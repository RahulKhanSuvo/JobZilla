import AboutHero from "./AboutHero";
import AboutStats from "./AboutStats";
import AboutSteps from "./AboutSteps";
import AboutFeatures from "./AboutFeatures";

export default function About() {
  return (
    <div className="pt-20">
      <AboutHero />
      <AboutStats />
      <AboutSteps />
      <AboutFeatures />
    </div>
  );
}
