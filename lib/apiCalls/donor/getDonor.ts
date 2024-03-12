const server = process.env.NEXT_PUBLIC_SERVER_URL || "";

export const getDonor = async () => {
  let fetchedData = fetch(server + "get-donor", {
    credentials: "include",
  }).then((response) => response.json());
  return fetchedData;
};
