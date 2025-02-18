const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    // return res.status(401).json({
    //   message: "Unauthorized",
    // });
    return res.redirect("/user/login"); // Redirect to login if no token
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    // return res.status(401).json({
    //   message: "Unauthorized",
    // });
    res.clearCookie("token"); // Clear invalid token
    res.redirect("/user/login");
  }
}

module.exports = auth;