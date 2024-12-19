import * as storage from "./storage";

const disbookApiUrl = import.meta.env.VITE_Disbook_API_URL;
const token = storage.getToken();

let myInfo;

async function fetchMyInfo() {
  const response = await fetch(disbookApiUrl + "/users/isAuthorised", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch((err) => {
    console.error("Could not log in", err);
    throw new Error("");
  });

  if (!response.ok) {
    return;
  }

  myInfo = await response.json();
  return myInfo;
}

if (!myInfo) {
  fetchMyInfo();
}

export { myInfo };
