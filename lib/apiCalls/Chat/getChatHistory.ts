const server = process.env.NEXT_PUBLIC_SERVER_URL + "chat/" || "";

export const getChatHistory = async () => {
  let response = await fetch(server + "get-chat-history", {
    credentials: "include",
  });
  let data = await response.json();
  return data;
};
