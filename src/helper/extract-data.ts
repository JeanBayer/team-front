export function extractAuthData() {
  return JSON.parse(localStorage.getItem("auth-data") || "{}");
}
