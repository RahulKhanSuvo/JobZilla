import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import { useCurrentUserQuery } from "@/redux/features/auth/auth.api";
import { useProfileGuard } from "@/hooks/useProfileGuard";
import CompleteProfileModal from "@/components/recruiter/CompleteProfileModal";

export function DashboardHeader() {
  const { data: user } = useCurrentUserQuery();
  const { checkProfile, isModalOpen, setIsModalOpen } = useProfileGuard();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-8 px-6 bg-linear-to-r from-primary to-primary/80 rounded text-white shadow shadow-primary/10 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <h1 className="text-3xl font-bold tracking-tight">
            Recruiter Dashboard
          </h1>
          <p className="text-white/80 font-medium font-lato">
            Welcome back, {user?.data?.name}! Here's what's happening today.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <Button
            onClick={() =>
              checkProfile(() => navigate("/recruiter/my-jobs/post-job"))
            }
            className="bg-white text-primary hover:bg-white/90 rounded-lg px-6 font-bold shadow-lg shadow-white/10 border-none h-11"
          >
            <Plus className="size-4 mr-2 stroke-[3px]" />
            Post Job
          </Button>
        </motion.div>
      </div>

      <CompleteProfileModal isOpen={isModalOpen} onClose={setIsModalOpen} />
    </>
  );
}
