const server = process.env.NEXT_PUBLIC_SERVER_URL + "donor/" || "";

export const logoutDonor = async () => {
  let fetchedData = fetch(server + "logout", {
    credentials: "include",
  }).then((response) => response.json());
  return fetchedData;
};
