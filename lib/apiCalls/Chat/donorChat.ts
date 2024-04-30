const server = process.env.NEXT_PUBLIC_SERVER_URL + "chat/" || "";

export const donorChat = async ({ ...data }: any) => {
  let fetchedData = fetch(server + "donor-chat", {
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
