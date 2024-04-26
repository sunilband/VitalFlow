import { Message, UserData } from "./data";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../../../ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import { TbRobotFace } from "react-icons/tb";
import { useUser } from "@/contexts/userContext";
import { getChatHistory } from "@/lib/apiCalls/Chat/getChatHistory";
import { toast } from "sonner";
import { FaRegCircleUser } from "react-icons/fa6";

interface ChatListProps {
  messages?: Message[];
  selectedUser: UserData;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
  loadingAnswer?: boolean;
  setMessages?: any;
}

export function ChatList({
  messages,
  selectedUser,
  sendMessage,
  isMobile,
  loadingAnswer,
  setMessages,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useUser();
  let userNameInitials = user.name
    ? user.name
    : user.fullName
      ? user.fullName
      : user.campName
        ? user.campName
        : null;
  userNameInitials = userNameInitials
    ?.split(" ")
    .map((n: string) => n[0])
    .join("");

  // scroll to bottom of messages container when new message is added
  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
      <div
        ref={messagesContainerRef}
        className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
              transition={{
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  // @ts-ignore
                  duration: messages?.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                message.name !== selectedUser.name
                  ? "items-end"
                  : "items-start",
              )}
            >
              <div className="flex gap-3 items-center">
                {message.name === selectedUser.name && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarFallback>
                      <TbRobotFace />
                    </AvatarFallback>
                  </Avatar>
                )}
                <span className="bg-accent p-3 rounded-md max-w-xs">
                  {/* @ts-ignore */}
                  {message.message}
                </span>
                {message.name !== selectedUser.name && (
                  <Avatar className="flex justify-center items-center">
                    <AvatarFallback className="text-md">
                      {/* {userNameInitials || "User"} */}
                      <FaRegCircleUser />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar
        sendMessage={sendMessage}
        isMobile={isMobile}
        setMessages={setMessages}
      />
    </div>
  );
}
