require("dotenv").config();
const { sign, verify } = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (data) => {
    return sign({ data: data }, process.env.ACCESS_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
  },

  sendAccessToken: (res, data, accessToken) => {
    res.cookie("accessToken", accessToken, {
      domain: process.env.COOKIE_DOMAIN,
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    res.json({ data, message: "OK" });
  },

  isAuthorized: (req) => {
    console.log("isAuthorized | req.cookies : ", req.cookies);

    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return null;
    }
    try {
      return verify(accessToken, process.env.ACCESS_SECRET);
    } catch (err) {
      //return null if invalid token
      return null;
    }
  },
};
