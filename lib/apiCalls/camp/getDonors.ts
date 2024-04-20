const server = process.env.NEXT_PUBLIC_SERVER_URL + "camp/" || "";

export const getDonors = async ({ ...data }: any) => {
  let fetchedData = fetch(server + "get-donors", {
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
