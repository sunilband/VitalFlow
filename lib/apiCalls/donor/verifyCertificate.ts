const server = process.env.NEXT_PUBLIC_SERVER_URL + "donor/" || "";

export const verifyCertificate = async ({ ...data }: any) => {
  let fetchedData = fetch(server + "verify-certificate", {
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
