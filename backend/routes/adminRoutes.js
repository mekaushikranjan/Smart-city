router.put("/make-admin/:id", async (req, res) => {
    if (!req.session.user || req.session.user.role !== "admin") {
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        await User.findByIdAndUpdate(req.params.id, { role: "admin" });
        res.json({ message: "User is now an admin" });
    } catch (error) {
        res.status(500).json({ message: "Error updating user role" });
    }
});
