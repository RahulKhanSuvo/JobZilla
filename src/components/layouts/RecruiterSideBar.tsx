import { recruiterSidebarData } from "./sidebarData";
import BaseSideBar from "./BaseSideBar";
import { useGetConversationsQuery } from "@/redux/features/chat/chat.api";
import { useMemo } from "react";

export default function RecruiterSideBar() {
  const { data: conversationsResponse } = useGetConversationsQuery(undefined);

  const unreadMessagesCount = useMemo(() => {
    if (!conversationsResponse?.data) return 0;
    return conversationsResponse.data.reduce((acc, conv) => {
      return acc + (conv._count?.messages || 0);
    }, 0);
  }, [conversationsResponse]);

  const updatedSidebarData = useMemo(() => {
    return recruiterSidebarData.map((item) => {
      if (item.href === "messages") {
        return { ...item, badge: unreadMessagesCount };
      }
      return item;
    });
  }, [unreadMessagesCount]);

  return <BaseSideBar data={updatedSidebarData} title="Recruiter Navigation" />;
}
