const server = process.env.NEXT_PUBLIC_SERVER_URL + "bloodbank/" || "";

export const filterDonations = async ({ ...data }: any) => {
  let fetchedData = fetch(server + "filter-donations", {
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
