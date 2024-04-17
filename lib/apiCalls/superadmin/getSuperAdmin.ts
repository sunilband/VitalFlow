const server = process.env.NEXT_PUBLIC_SERVER_URL + "superadmin/" || "";

export const getSuperAdmin = async () => {
  let response = await fetch(server + "get-super-admin", {
    credentials: "include",
  });
  let data = await response.json();

  return data;
};
