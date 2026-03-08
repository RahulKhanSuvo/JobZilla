import HeroSection from "./hero/HeroSection";
import Sponsor from "./Sponsor";
import FeaturedJobs from "./Featured/FeaturedJobs";
import WhyJobZilla from "./Why/WhyJobZilla";
import ClinetReview from "./ClientReview/ClinetReview";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedJobs />
      <WhyJobZilla />
      <ClinetReview />
      <Sponsor />
    </>
  );
}
