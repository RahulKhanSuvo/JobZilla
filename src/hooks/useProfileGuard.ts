import { useCurrentUserQuery } from "@/redux/features/auth/auth.api";
import { useState } from "react";

export const useProfileGuard = () => {
  const { data: userResponse, isLoading } = useCurrentUserQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = userResponse?.data;
  const company = user?.company;

  // Profile is complete if company object exists and has essential fields
  const isComplete =
    !!company &&
    (company.description?.length ?? 0) >= 10 &&
    (company.industry?.length ?? 0) >= 1;

  const checkProfile = (onComplete: () => void) => {
    if (isComplete) {
      onComplete();
    } else {
      setIsModalOpen(true);
    }
  };

  return {
    isComplete,
    isLoading,
    isModalOpen,
    setIsModalOpen,
    checkProfile,
  };
};
