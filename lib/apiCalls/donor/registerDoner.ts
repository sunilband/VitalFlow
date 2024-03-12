const server = process.env.NEXT_PUBLIC_SERVER_URL || "";

export const registerDoner = async ({
  ...data
}: {
  otp: string;
  phoneOrEmail: string;
}) => {
  let fetchedData = fetch(server + "register-doner", {
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
