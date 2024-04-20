const server = process.env.NEXT_PUBLIC_SERVER_URL + "camp/" || "";

export const createDonation = async ({ ...data }: any) => {
  let fetchedData = fetch(server + "create-donation", {
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
