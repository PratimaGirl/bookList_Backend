const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWTSECRET;

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }
    const token = authHeader.split(" ")[1].trim();
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = verifyToken;
