const tockenStorageKey = "token";

function setToken(token) {
  localStorage.setItem(tockenStorageKey, token);
}

function getToken() {
  return localStorage.getItem(tockenStorageKey);
}

function clear() {
  localStorage.clear();
}

export { setToken, getToken, clear };
