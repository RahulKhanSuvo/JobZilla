import { candidateSidebarData } from "./sidebarData";
import BaseSideBar from "./BaseSideBar";

export default function CandidateSideBar() {
  return (
    <BaseSideBar data={candidateSidebarData} title="Candidate Navigation" />
  );
}
