import { Button } from "@/components/ui/button";
import type { FC } from "react";
import { useNavigate } from "react-router";

const ProfileEmptyState: FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-4">
      <h2 className="text-2xl font-bold mb-2 text-foreground">
        Complete Your Candidate Profile
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        It looks like you haven't set up your candidate profile yet. Start by
        adding your details to attract recruiters.
      </p>
      <Button
        onClick={() => navigate("/candidate/profile/edit")}
        className="bg-primary text-primary-foreground font-bold py-3 px-8 rounded shadow hover:shadow-md transition-all"
      >
        Build Profile
      </Button>
    </div>
  );
};

export default ProfileEmptyState;
