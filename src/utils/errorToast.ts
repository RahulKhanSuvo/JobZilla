import { toast } from "sonner";

interface LoginError {
  message: string;
  success?: boolean;
}

// Reusable error toast function
export const errorToast = (e: unknown) => {
  const error = e as { data?: LoginError; error?: string };

  const message =
    error?.data?.message || error?.error || "Something went wrong";

  toast.error(message);
};
