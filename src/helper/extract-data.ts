export function extractAuthData() {
  return JSON.parse(localStorage.getItem("auth-data") || "{}");
}

export function updateAuthData(data: any) {
  localStorage.setItem("auth-data", JSON.stringify(data));
}
