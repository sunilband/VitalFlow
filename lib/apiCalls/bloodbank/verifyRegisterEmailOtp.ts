const server = process.env.NEXT_PUBLIC_SERVER_URL + "bloodbank/" || "";

export const verifyRegisterEmailOtp = async ({ ...data }: any) => {
  let fetchedData = fetch(server + "verify-otp", {
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
