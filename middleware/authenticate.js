// middleware/authenticate.js
import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Assumes "Bearer <token>"

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify and decode token
    req.user = decoded; // Attach decoded user info to req.user
    next(); // Move to the next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
