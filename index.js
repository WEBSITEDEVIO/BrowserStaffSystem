const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
  origin: "https://jouw-frontend-url.vercel.app",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("BrowserStaffSystem backend running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
