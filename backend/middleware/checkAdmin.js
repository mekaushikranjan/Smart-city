// Middleware to check if the user is admin
const checkAdmin = (req, res, next) => {
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
    }
    next(); // Proceed to the next middleware or route handler
};

module.exports = { checkAdmin };
