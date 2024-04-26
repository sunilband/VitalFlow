const server = process.env.NEXT_PUBLIC_SERVER_URL + "chat/" || "";

export const clearChatContext = async () => {
  let fetchedData = fetch(server + `remove-chat-context`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json());
  return fetchedData;
};
