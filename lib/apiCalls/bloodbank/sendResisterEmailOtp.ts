const server = process.env.NEXT_PUBLIC_SERVER_URL + "bloodbank/" || "";

export const sendResisterEmailOtp = async (email: string) => {
  let fetchedData = fetch(server + "send-register-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
    }),
  }).then((response) => response.json());
  return fetchedData;
};
