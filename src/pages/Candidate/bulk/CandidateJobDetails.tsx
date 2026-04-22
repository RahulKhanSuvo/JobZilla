import { Button } from "@/components/ui/button";
import JobDetails from "@/pages/JobDetails/JobDetails";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

export default function CandidateJobDetails() {
  return (
    <div>
      <Button asChild variant={"link"} className="w-fit mb-4 px-0">
        <Link to="..">
          <ArrowLeft /> back
        </Link>
      </Button>
      <JobDetails />
    </div>
  );
}
