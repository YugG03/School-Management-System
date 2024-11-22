// middleware/permissions.js
export const isAdmin = (req, res, next) => {
  const userRole = req.user.role;
  // Assume req.user is set after authentication
  if (!userRole.includes("admin")) {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }

  next(); // Proceed to the next middleware or route handler
};
