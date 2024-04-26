import { Message, UserData } from "./data";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";
import { getChatHistory } from "@/lib/apiCalls/Chat/getChatHistory";
import { toast } from "sonner";
import { bloodBankChat } from "@/lib/apiCalls/Chat/boodBankChat";
import { FaRegCircleUser } from "react-icons/fa6";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
}

export function Chat({ messages, selectedUser, isMobile }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>([]);

  React.useEffect(() => {
    try {
      getChatHistory().then((res) => {
        if (res.success) {
          let data = res.data.map((item: any, index: any) => ({
            id: index + 1, // Using index as id, you might want to replace this
            avatar: item.role, // Assuming avatar based on role
            name: item.role === "user" ? "Jakob Hoeg" : "Jane Doe", // Assuming name based on role
            message: item.message,
          }));

          setMessages(data);
        }
        if (!res.success) {
          console.log(res.message);
          toast.error(res.message);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const [loadingAnswer, setLoadingAnswer] = React.useState(false);

  const sendMessage = (newMessage: Message) => {
    setMessages([...messagesState, newMessage]);
    try {
      setLoadingAnswer(true);
      const question = Object.values(newMessage.message).join("");
      bloodBankChat({ question }).then((res) => {
        if (res.success) {
          let data = {
            id: messagesState.length + 1, // Using index as id, you might want to replace this
            avatar: "model", // Assuming avatar based on role
            name: "Jane Doe", // Assuming name based on role
            message: res.data.AiOutput,
          };
          setMessages((prevMessages) => [...prevMessages, data]);
          setLoadingAnswer(false);
        }
        if (!res.success) {
          console.log(res.message);
          toast.error(res.message);
          setLoadingAnswer(false);
        }
      });
    } catch (error) {
      console.log(error);
      setLoadingAnswer(false);
    }
  };

  return (
    <div className="flex flex-col justify-between w-full h-full z-50">
      <ChatTopbar selectedUser={selectedUser} />
      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
        loadingAnswer={loadingAnswer}
        setMessages={setMessages}
      />
    </div>
  );
}
