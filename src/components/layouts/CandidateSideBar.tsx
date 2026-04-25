import { candidateSidebarData } from "./sidebarData";
import BaseSideBar from "./BaseSideBar";
import { useGetConversationsQuery } from "@/redux/features/chat/chat.api";
import { useMemo } from "react";

export default function CandidateSideBar() {
  const { data: conversationsResponse } = useGetConversationsQuery(undefined);

  const unreadMessagesCount = useMemo(() => {
    if (!conversationsResponse?.data) return 0;
    return conversationsResponse.data.reduce((acc, conv) => {
      return acc + (conv._count?.messages || 0);
    }, 0);
  }, [conversationsResponse]);

  const updatedSidebarData = useMemo(() => {
    return candidateSidebarData.map((item) => {
      if (item.href === "messages") {
        return {
          ...item,
          badge: unreadMessagesCount > 0 ? unreadMessagesCount : undefined,
        };
      }
      return item;
    });
  }, [unreadMessagesCount]);

  return <BaseSideBar data={updatedSidebarData} title="Candidate Navigation" />;
}
