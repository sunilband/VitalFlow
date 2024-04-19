const server = process.env.NEXT_PUBLIC_SERVER_URL + "superadmin/" || "";

export const changeBloodBankStatus = async ({ id, status }: any) => {
  let fetchedData = fetch(
    server + `change-blood-bank-status?id=${id}&status=${status}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  ).then((response) => response.json());
  return fetchedData;
};
