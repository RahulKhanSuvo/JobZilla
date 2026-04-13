import { recruiterSidebarData } from "./sidebarData";
import BaseSideBar from "./BaseSideBar";

export default function RecruiterSideBar() {
  return (
    <BaseSideBar data={recruiterSidebarData} title="Recruiter Navigation" />
  );
}
