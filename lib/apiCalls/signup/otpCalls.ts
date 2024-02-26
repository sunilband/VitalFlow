const server = process.env.NEXT_PUBLIC_SERVER_URL || "";

export const sendPhoneOtp = async ({ phone }: { phone: string }) => {
  let sendOTP = fetch(server + "send-phone-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ phone }),
  }).then((response) => response.json());
  return sendOTP;
};

export const sendEmailOtp = async ({ email }: { email: string }) => {
  let sendOTP = fetch(server + "send-email-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  }).then((response) => response.json());
  return sendOTP;
};

export const verifyOtp = async ({
  otp,
  phoneOrEmail,
}: {
  otp: string;
  phoneOrEmail: string;
}) => {
  const isEmail = phoneOrEmail.includes("@");
  let verifyOTP = fetch(server + "verify-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      isEmail ? { email: phoneOrEmail, otp } : { phone: phoneOrEmail, otp },
    ),
  }).then((response) => response.json());
  return verifyOTP;
};
