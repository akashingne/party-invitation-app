const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.json({
      success: false,
      message: "No token, authorization failed",
    });
  }

  try {
    const mainToken = token.split(" ")[1];
    const decoded = jwt.verify(mainToken, process.env.JWT_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(401)
      .json({ success: false, message: "token cannot authorized" });
  }
};
