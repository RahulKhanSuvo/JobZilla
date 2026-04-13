import AboutHero from "./components/AboutHero";
import AboutStats from "./components/AboutStats";
import AboutSteps from "./components/AboutSteps";
import AboutFeatures from "./components/AboutFeatures";
import AboutUseChose from "./components/AboutUseChose";

export default function About() {
  return (
    <>
      <title>About Us - JobZilla</title>
      <meta name="description" content="About Us - JobZilla" />
      <meta name="keywords" content="About Us - JobZilla" />
      <meta name="author" content="About Us - JobZilla" />
      <AboutHero />
      <AboutStats />
      <AboutSteps />
      <AboutFeatures />
      <AboutUseChose />
    </>
  );
}
