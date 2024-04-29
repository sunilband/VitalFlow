const server = process.env.NEXT_PUBLIC_SERVER_URL + "chat/" || "";

export const campChat = async ({ ...data }: any) => {
  let fetchedData = fetch(server + "camp-chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      ...data,
    }),
  }).then((response) => response.json());
  return fetchedData;
};
