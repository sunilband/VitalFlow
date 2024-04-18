const server = process.env.NEXT_PUBLIC_SERVER_URL + "camp/" || "";

export const registerCamp = async ({ ...data }: any) => {
  let fetchedData = fetch(server + "register", {
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
