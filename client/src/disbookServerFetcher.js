import * as storage from "/src/storage";
const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;

async function get(routeUrl, withAuthuntication = true) {
  const token = storage.getToken();

  const headers = {};

  if (withAuthuntication) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(disbookApiUrl + routeUrl, {
    method: "GET",
    headers: headers,
  }).catch((error) => {
    console.error("Failed to get", error);
  });

  return response;
}

async function post(routeUrl, body, withAuthuntication = true) {
  const token = storage.getToken();

  const headers = {
    "Content-Type": "application/json",
  };

  if (withAuthuntication) {
    headers.Authorization = `Bearer ${token}`;
  }

  const requestOptions = {
    method: "POST",
    headers: headers,
  };

  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  const response = await fetch(disbookApiUrl + routeUrl, requestOptions).catch(
    (error) => {
      console.error("Failed to post", error);
    }
  );

  return response;
}

export { get, post };
