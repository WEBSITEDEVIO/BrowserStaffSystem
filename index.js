const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

/* ===== Middleware ===== */
app.use(cors({
  origin: "https://jouw-frontend.vercel.app", // pas later aan
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

/* ===== Test route ===== */
app.get("/", (req, res) => {
  res.send("BrowserStaffSystem backend running");
});

/* ===== Auth routes ===== */
require("./auth/roblox")(app);

/* ===== Server start ===== */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});