const server = process.env.NEXT_PUBLIC_SERVER_URL + "camp/" || "";

export const getCamp = async () => {
  let response = await fetch(server + "get-camp", {
    credentials: "include",
  });
  let data = await response.json();
  return data;
};
