import { type ReactNode, useEffect } from "react";
import { useCurrentUserQuery } from "@/redux/features/auth/auth.api";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoading,
  setCredentials,
  setLoading,
} from "@/redux/features/auth/authSlice";

import JobzillaLoading from "@/components/common/JobzillaLoading";

interface SessionProviderProps {
  children: ReactNode;
}

export default function SessionProvider({ children }: SessionProviderProps) {
  const { data: user, isLoading } = useCurrentUserQuery();
  console.log(user);
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  useEffect(() => {
    dispatch(setLoading(true));

    if (user) {
      dispatch(setCredentials({ user: user.data }));
    }
    if (!isLoading) {
      dispatch(setLoading(false));
    }
  }, [user, isLoading, dispatch]);

  if (loading) {
    return <JobzillaLoading />;
  }

  return <>{children}</>;
}
