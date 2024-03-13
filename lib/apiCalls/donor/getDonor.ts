const server = process.env.NEXT_PUBLIC_SERVER_URL + "donor/" || "";

const refreshToken = async () => {
  let refreshTokenFetch = fetch(server + "refresh-token", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((response) => response.json());
  return refreshTokenFetch;
};

export const getDonor = async () => {
  let response = await fetch(server + "get-donor", {
    credentials: "include",
  });
  let data = await response.json();

  if (data.success === false && data.message === "Middleware: Invalid token") {
    await refreshToken();
    response = await fetch(server + "get-donor", {
      credentials: "include",
    });
    data = await response.json();
  }
  return data;
};
