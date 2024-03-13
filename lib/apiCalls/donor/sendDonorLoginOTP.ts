const server = process.env.NEXT_PUBLIC_SERVER_URL + "donor/" || "";
type DonorLoginSendOTP =
  | { phone: string; email?: string }
  | { phone?: string; email: string };

export const sendDonorLoginOTP = async ({ ...data }: DonorLoginSendOTP) => {
  let fetchedData = fetch(server + "send-login-otp", {
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
