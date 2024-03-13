const server = process.env.NEXT_PUBLIC_SERVER_URL + "donor/" || "";
type DonorLogin =
  | { phone: string; email?: string; otp: string }
  | { phone?: string; email: string; otp: string };

export const donorLogin = async ({ ...data }: DonorLogin) => {
  let fetchedData = fetch(server + "login-donor", {
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
