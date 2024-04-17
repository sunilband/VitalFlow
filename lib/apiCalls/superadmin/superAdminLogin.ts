const server = process.env.NEXT_PUBLIC_SERVER_URL + "superadmin/" || "";

export const superAdminLogin = async ({ email, password }: any) => {
  let fetchedData = fetch(server + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((response) => response.json());
  return fetchedData;
};
