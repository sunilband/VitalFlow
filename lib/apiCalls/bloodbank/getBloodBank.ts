const server = process.env.NEXT_PUBLIC_SERVER_URL + "bloodbank/" || "";

export const getBloodbank = async () => {
  let response = await fetch(server + "get-blood-bank", {
    credentials: "include",
  });
  let data = await response.json();
  return data;
};
