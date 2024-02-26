const apiKey = "Yko5aE42bkhKVzBXUWozWFpDSVZONDg5NkVzd0FQaXNMS3VxaTFybA==";

export const getAllStates = async () => {
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", apiKey);
  let requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow" as RequestRedirect, // Add the correct type for the redirect property
  };
  const fetchedData = fetch(
    "https://api.countrystatecity.in/v1/countries/IN/states",
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
  return fetchedData;
};

export const getCities = async (state: string) => {
  var headers = new Headers();
  headers.append("X-CSCAPI-KEY", apiKey);
  let requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow" as RequestRedirect, // Add the correct type for the redirect property
  };
  const fetchedData = fetch(
    `https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`,
    requestOptions,
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
  return fetchedData;
};
