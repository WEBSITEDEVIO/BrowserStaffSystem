const axios = require("axios");
const jwt = require("jsonwebtoken");

const GROUP_ID = process.env.GROUP_ID;
const MIN_RANK = parseInt(process.env.MIN_RANK, 10);
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = (app) => {

  /* Start login */
  app.get("/auth/roblox", (req, res) => {
    res.send(`
      <html>
        <body style="background:#0f172a;color:white;font-family:Arial;text-align:center;margin-top:100px">
          <h2>Roblox login</h2>
          <p>Je moet ingelogd zijn op Roblox in deze browser.</p>
          <a href="/auth/roblox/callback">Doorgaan</a>
        </body>
      </html>
    `);
  });

  /* Callback */
  app.get("/auth/roblox/callback", async (req, res) => {
    try {
      const cookie = req.headers.cookie;
      if (!cookie) {
        return res.status(401).send("Geen Roblox login cookie gevonden");
      }

      /* Authenticated user */
      const userRes = await axios.get(
        "https://users.roblox.com/v1/users/authenticated",
        { headers: { Cookie: cookie } }
      );

      const userId = userRes.data.id;
      const username = userRes.data.name;

      /* Group ranks */
      const groupsRes = await axios.get(
        `https://groups.roblox.com/v2/users/${userId}/groups/roles`
      );

      const group = groupsRes.data.data.find(
        g => g.group.id == GROUP_ID
      );

      const rank = group ? group.role.rank : 0;

      if (rank < MIN_RANK) {
        return res.status(403).send("Je hebt geen staff rechten");
      }

      /* JWT */
      const token = jwt.sign(
        { userId, username, rank },
        JWT_SECRET,
        { expiresIn: "12h" }
      );

      /* Redirect naar frontend */
      res.redirect(
        `https://jouw-frontend.vercel.app/?token=${token}`
      );

    } catch (err) {
      console.error(err);
      res.status(500).send("Roblox login error");
    }
  });
};
