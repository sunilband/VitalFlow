const server = process.env.NEXT_PUBLIC_SERVER_URL + "bloodbank/" || "";

export const getAllDonors = async ({ ...data }: any) => {
  let fetchedData = fetch(server + "filter-donors", {
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
