const server = process.env.NEXT_PUBLIC_SERVER_URL + "bloodbank/" || "";

export const changeCampStatus = async ({ id, status }: any) => {
  let fetchedData = fetch(
    server + `change-camp-status?id=${id}&status=${status}`,
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
