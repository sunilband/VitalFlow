const server = process.env.NEXT_PUBLIC_SERVER_URL + "bloodbank/" || "";

export const ExtractComponentsFromWholeBlood = async ({ ...data }: any) => {
  let fetchedData = fetch(server + `extract-components`, {
    method: "PUT",
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
