const axios = require("axios");
const jwt = require("jsonwebtoken");

const GROUP_ID = 123456
const MIN_RANK = 100
const JWT_SECRET = "zet-dit-later-in-render-env"

async function getUserId(cookie) {
  const res = await axios.get(
    "https://users.roblox.com/v1/users/authenticated",
    { headers: { Cookie: cookie } }
  );
  return res.data.id;
}

async function getGroupRank(userId) {
  const res = await axios.get(
    `https://groups.roblox.com/v2/users/${userId}/groups/roles`
  );
  const group = res.data.data.find(g => g.group.id === GROUP_ID);
  return group ? group.role.rank : 0;
}

module.exports = (app) => {
  app.get("auth roblox", (req, res) => {
    res.redirect(
      "https://www.roblox.com/login?returnUrl=https://jouw-backend.onrender.com/auth roblox callback"
    );
  });

  app.get("auth roblox callback", async (req, res) => {
    try {
      const cookie = req.headers.cookie;
      if (!cookie) return res.redirect("login error");

      const userId = await getUserId(cookie);
      const rank = await getGroupRank(userId);

      if (rank < MIN_RANK) return res.redirect("no access");

      const token = jwt.sign({ userId, rank }, JWT_SECRET, { expiresIn: "12h" });
      res.redirect(`https://jouw-frontend.vercel.app/success?token=${token}`);
    } catch {
      res.redirect("login error");
    }
  });
};
