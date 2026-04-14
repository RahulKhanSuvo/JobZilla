import type { FC } from "react";

const ProfileErrorState: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] text-center p-4">
      <div className="size-16 bg-destructive/10 text-destructive rounded-full flex items-center justify-center mb-4">
        <span className="text-2xl font-bold">!</span>
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">
        Failed to load profile
      </h2>
      <p className="text-muted-foreground max-w-md">
        Something went wrong while fetching your profile information. Please try
        refreshing the page or try again later.
      </p>
    </div>
  );
};

export default ProfileErrorState;
