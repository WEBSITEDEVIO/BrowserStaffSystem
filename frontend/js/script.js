const BACKEND_URL = "https://browserstaffsystem.onrender.com";

/* Login button */
document.getElementById("loginBtn").addEventListener("click", () => {
  window.location.href = BACKEND_URL + "/auth/roblox";
});

/* Token verwerken */
const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (token) {
  localStorage.setItem("staff_jwt", token);
  document.getElementById("status").innerText = "Succesvol ingelogd!";
  window.history.replaceState({}, document.title, "/");
}
