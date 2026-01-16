// 🔴 JOUW RENDER BACKEND URL
const BACKEND_URL = "https://browserstaffsystem.onrender.com";

// Check of we terugkomen van Roblox met token
const params = new URLSearchParams(window.location.search);
const token = params.get("token");

if (token) {
  localStorage.setItem("jwt", token);

  // Token uit URL halen (netjes)
  window.history.replaceState({}, document.title, "/");

  document.getElementById("content").innerHTML = `
    <p>✅ Logged in successfully</p>
  `;
}

// Login knop
document.getElementById("loginBtn").addEventListener("click", () => {
  window.location.href = `${BACKEND_URL}/auth/roblox`;
});
