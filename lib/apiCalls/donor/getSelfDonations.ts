const server = process.env.NEXT_PUBLIC_SERVER_URL + "donor/" || "";

export const getSelfDonations = async () => {
  let response = await fetch(server + "get-all-self-donations", {
    credentials: "include",
  });
  let data = await response.json();
  return data;
};
